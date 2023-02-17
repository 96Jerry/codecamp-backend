import express from "express";
import mongoose from "mongoose";
import { Token } from "./models/token.model.js";
import { createValidationPhone } from "./phone.js";
import bodyParser from "body-parser";

const Schema = mongoose.Schema;
const app = express();
app.use(bodyParser.json());

app.post("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;
  // 1. 인증토큰 발급
  const number = createValidationPhone();
  // 2. db 확인, 핸드폰 번호 비교
  const isThere = await Token.findOne({ phone: phone });
  console.log(isThere);
  // 2-1. 저장이 안되어있으면 새로 저장
  if (isThere === null) {
    const token = new Token({
      _id: mongoose.Types.ObjectId(),
      token: number,
      phone: phone,
      isAuth: false,
    });
    console.log("저장안되어있음");
    await token.save();
  }
  // 2-2. 저장이 되어있으면 update
  else {
    await Token.updateOne({ phone: phone }, { $set: { token: number } });
    console.log("저장되어있음");
  }

  res.send("db 저장완");
});

mongoose.connect("mongodb://localhost:27017/myfolder04", () => {
  console.log("mongodb 접속완료");
});

app.listen(3000, () => {
  console.log("listening prot 3000");
});
