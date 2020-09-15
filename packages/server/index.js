const express = require("express");
// TODO : sequelize-cli 를 이용해 모델을 추가해 사용하세요.
require("./models");

const mainController = require("./controllers");

const app = express();

const port = 4000;

// TODO : express-session, cors 등 필요한 middleware를 사용하세요.

app.get("/user", mainController.userController);
app.post("/signin", mainController.signInController);
app.post("/signup", mainController.signUpController);

// NOTICE 테스트를 위한 코드 입니다. 건들지 않으셔도 좋습니다.
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
}

module.exports = app;
