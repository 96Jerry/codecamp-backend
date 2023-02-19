import coolsms from "coolsms-node-sdk";
import "dotenv/config";

export function createValidationPhone() {
  const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(6, "0");
  return result;
}

export function sendSMS(myphone, token) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;
  const mysms = coolsms.default;
  const messageService = new mysms(SMS_KEY, SMS_SECRET);
  messageService.sendOne({
    to: myphone,
    from: SMS_SENDER,
    text: `[코드캠프] 안녕하세요. 인증번호는 ${token} 입니다.`,
  });
}

export function checkValidationPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}
