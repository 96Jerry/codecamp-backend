import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendWelcomeTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import { BoardController } from "./controllers/board.controller.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

const boardController = new BoardController();
app.get("/boards", boardController.getBoard);
app.post("/boards", boardController.postBoard);

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.aaa;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
  }

  res.send("인증완료.");
});

app.post("/users", (req, res) => {
  const user = req.body.myuser;

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(user.email);
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const template = getWelcomeTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendWelcomeTemplateToEmail(user.email, template);
    res.send("가입완료!");
  }
});

//api 서버 실행
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
