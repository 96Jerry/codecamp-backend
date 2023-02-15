import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendWelcomeTemplateToEmail,
} from "./email.js";

const swaggerSpec = swaggerJsdoc(options);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 회원 목록 조회 api 만들기
const users = [
  {
    email: "aaa@gmail.com",
    name: "철수",
    phone: "010-1234-5678",
    personal: "220110-2222222",
    prefer: "https://naver.com",
  },
  {
    email: "Nick@nick.com",
    name: "Nick",
    phone: "010-1234-5678",
    personal: "220219-0000000",
    prefer: "https://naver.com",
  },
  {
    email: "Judy@judy.com",
    name: "Judy",
    phone: "010-1234-5678",
    personal: "220219-0000000",
    prefer: "https://naver.com",
  },
  {
    email: "Anna@anna.com",
    name: "Anna",
    phone: "010-1234-5678",
    personal: "220219-0000000",
    prefer: "https://naver.com",
  },
  {
    email: "Elsa@elsa.com",
    name: "Elsa",
    phone: "010-1234-5678",
    personal: "220219-0000000",
    prefer: "https://naver.com",
  },
];
// 1. 휴대폰 인증 토큰 발급 api
app.get("/users");
// 2. 회원가입 api(가입 환영 템플릿 이메일 발송)
app.get("/users", function (req, res) {
  res.send(users);
});

// 커피 목록 조회 api 만들기
const coffee = [
  { name: "아메리카노", kcal: 5 },
  { name: "카페라떼", kcal: 10 },
  { name: "콜드브루", kcal: 15 },
  { name: "카페모카", kcal: 50 },
  { name: "돌체라떼", kcal: 500 },
  { name: "카라멜라떼", kcal: 200 },
  { name: "바닐라라떼", kcal: 20 },
  { name: "에스프레소", kcal: 1 },
  { name: "디카페인", kcal: 5 },
  { name: "오트라떼", kcal: 300 },
];
app.get("/starbucks", function (req, res) {
  res.send(coffee);
});

// 인증번호 발급 api
app.post("/validationNumber", (req, res) => {
  const myphone = req.body.aaa;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
  }
  res.send("인증완료");
});

// email 발송 api
app.post("/userInfo", (req, res) => {
  const user = req.body.myuser;
  console.log(user);

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

app.listen(3000, () => {
  console.log("listening port 3000");
});
