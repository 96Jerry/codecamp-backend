import express from "express";
import bodyParser from "body-parser";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import mongoose from "mongoose";
import { Token } from "./models/tokenSchema.model.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// 회원가입
app.post("/user", (req, res) => {
  res.send("hi");
});

// 회원 목록 조회
app.get("/users", (req, res) => {
  res.send("hi");
});

// 토큰 인증 요청
app.post("/tokens/phone", async (req, res) => {
  // 1. phone number를 전달받고 token 생성 및, 문자로 전송
  const phone = req.body.aaa;
  const number = getToken();
  // sendTokenToSMS(phone, number);

  // 2. db에 값 저장(이미있는 핸드폰 번호인지 확인)
  const isThere = await Token.findOne({ phone: phone });

  // 2-1. 저장이 안되어있으면 새로 저장
  if (isThere === null) {
    const token = new Token({
      _id: mongoose.Types.ObjectId(),
      token: number,
      phone: phone,
      isAuth: false,
    });
    await token.save();
  }

  // 2-2. 저장이 되어있으면 update
  else {
    await Token.updateOne({ phone: phone }, { $set: { token: number } });
  }

  // 3. 핸드폰 번호 유효성 검사
  const isValid = checkValidationPhone(phone);
  if (isValid) {
    res.send("핸드폰으로 인증번호 전송완료");
  } else {
    res.send("유효하지 않은 핸드폰 번호");
  }
});

// 인증 완료
app.patch("/tokens/phone", async (req, res) => {
  // 1. 핸드폰 번호와 토큰을 입력받음
  const phone = req.body.aaa;
  const number = req.body.bbb;

  // 2. Tokens DB 에서 값을 찾아봄
  const isThere = await Token.findOne({ phone: phone });

  // 2-1. 핸드폰 번호가 저장되어 있지 않다면 false
  if (isThere === null) {
    res.send(false);
  }

  // 2-2. 핸드폰 번호가 저장되어 있지만 인증번호가 일치하지 않는다면 false
  if (isThere) {
    if (isThere.token !== number) res.send(false);
    else if (isThere.token === number) {
      await Token.updateOne({ phone: phone }, { $set: { isAuth: true } });
      res.send(true);
    }
  }
});

// 스타벅스 커피 목록 조회
app.get("/starbucks", (req, res) => {
  res.send("hi");
});

mongoose.connect("mongodb://my-database:27017/mydocker01");

app.listen(3000, () => {
  console.log("listening port 3000");
});
