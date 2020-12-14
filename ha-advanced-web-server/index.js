const express = require("express");
const cors = require('cors');
const session = require('express-session');
const logger = require('morgan');
require("./models");

// TODO : express-session, cors 등 필요한 middleware를 추가하세요.

const mainController = require("./controllers");

const app = express();

app.use(logger('dev'));
const port = 4000;

// TODO : express-session, cors 등 필요한 middleware를 적용하세요.

app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);
app.use(session({
  secret: '@codestates',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 6 * 60 * 10000,
    httpOnly: true,
    secure: false,
    sameSite : 'none',
  }
}));




app.get("/user", mainController.userController);
app.post("/signin", mainController.signInController);
app.post("/signup", mainController.signUpController);
app.post("/signout", mainController.signOutController);

// NOTICE 테스트를 위한 코드 입니다. 건들지 않으셔도 좋습니다.
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
}

module.exports = app;
