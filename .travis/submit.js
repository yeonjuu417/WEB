const { exec } = require("child_process");
const https = require("https");
const { readFileSync } = require("fs");
const {
  URCLASS_URL,
  URCLASS_KEY,
  ASSESSMENT_ID,
  TRAVIS_PULL_REQUEST_SLUG
} = process.env;

if (URCLASS_KEY === "\n") {
  throw new Error("urclass key is missing");
}

if (TRAVIS_PULL_REQUEST_SLUG === "\n") {
  throw new Error("github username is missing");
}


exec(
  "npx lerna run --no-bail report --stream",
  (err, stdout, stderr) => {
    let resultServer, resultClient, ps, pc;
    try {
      resultServer = readFileSync('./packages/server/report.json')
      resultServer = resultServer.toString()
      ps = JSON.parse(resultServer)
    }
    catch {
      ps = { stats: {} }
    }

    try {
      resultClient = readFileSync('./packages/client/report.json')
      resultClient = resultClient.toString()
      pc = JSON.parse(resultClient)
    }
    catch {
      pc = { stats: {} }
    }

    let result = {
      stats: {
        "suites": (ps.stats.suites || 0) + (pc.stats.suites || 0),
        "tests": (ps.stats.tests || 0) + (pc.stats.tests || 0),
        "passes": (ps.stats.passes || 0) + (pc.stats.passes || 0),
        "pending": (ps.stats.pending || 0) + (pc.stats.pending || 0),
        "failures": (ps.stats.failures || 0) + (pc.stats.failures || 0)
      }
    }
    const username = TRAVIS_PULL_REQUEST_SLUG.split("/")[0];

    const options = {
      hostname: URCLASS_URL,
      path: `/production/submit/sprint`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(JSON.stringify(options));
    console.log(result);

    const body = {
      assessment_id: ASSESSMENT_ID,
      githubUsername: username,
      type: "mocha",
      result: result,
    };

    makeRequest(options, body);
  }
);

function makeRequest(options, body) {
  const req = https.request(options, (res) => {
    let data;
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      console.log("data from urclass is ", data);
      if (res.statusCode >= 400) {
        if (res.statusCode === 400) {
          throw new Error("invalid github username.");
        }
        throw new Error("There is an error on response from urclass.");
      }
    });
  });

  req.on("error", (e) => {
    console.log(e);
    throw new Error("data did not send to urclass");
  });

  req.write(JSON.stringify(body));
  req.end();
}
