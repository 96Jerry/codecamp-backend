import { express } from "express";
const app = express();

// 주식 가격 조회하기
app.get("/stocks", (res, req) => {
  res.send("주식 가격 조회");
});

// 주식 최대 가격 조회
app.get("/stocks/max", (res, req) => {
  res.send("주식 최대 가격 조회");
});

// 신규주식 등록
app.post("/stocks", (res, req) => {
  res.send("신규 주식 등록");
});

app.listen(3002);
