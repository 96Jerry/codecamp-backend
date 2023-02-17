import express from "express";
import mongoose from "mongoose";
import { Token } from "./models/token.model.js";
import {
  createValidationPhone,
  sendSMS,
  checkValidationPhone,
} from "./phone.js";
import bodyParser from "body-parser";
import "dotenv/config";

const Schema = mongoose.Schema;
const app = express();
app.use(bodyParser.json());

app.post("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;
  // 1. 인증토큰 발급
  const number = createValidationPhone();
  // 2. db 확인, 핸드폰 번호 비교
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
  // 3.0. 핸드폰 번호 유효성 검사
  const isValid = checkValidationPhone(phone);
  if (isValid) {
    // 3. 핸드폰으로 인증번호 전송
    sendSMS(phone, number);
    res.send("핸드폰으로 인증번호 전송완료");
  } else {
    res.send("유효하지 않은 핸드폰 번호");
  }
});

mongoose.connect(process.env.MONGOOSE_URL, () => {
  console.log("mongodb 접속완료");
});

app.listen(3000, () => {
  console.log("listening prot 3000");
});
