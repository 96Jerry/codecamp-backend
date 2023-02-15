import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

const swaggerSpec = swaggerJsdoc(options);
const app = express();
app.use(cors());
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

app.listen(3000, () => {
  console.log("listening port 3000");
});
