import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config.js";

export function checkValidationEmail(email) {
  if (email === undefined) {
    console.log("에러발생!!! 이메일을 제대로 입력해주세요!!!");
    return false;
  }
  if (!email.includes("@")) {
    console.log("에러발생!!! 이메일을 제대로 입력해주세요!!!");
    return false;
  } else {
    return true;
  }
}

// console.log(checkValidationEmail("a@a"));
export function getWelcomeTemplate({ name, age, school }) {
  return `
  <html>
  <body>
  <div style="display: flex; flex-direction: column; align-items: center;">
  <h1>${name}님 가입을 환영합니다.</h1>
  <hr />
  <div>나이: ${age}살</div>
  <div>학교: ${school}</div>
  <div>가입일: ${getToday()}</div>
  </div>
  </body>
  </html>
  `;
}

export async function sendWelcomeTemplateToEmail(email, template) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMIAL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "[코드캠프] 가입을 축하합니다.",
    html: template,
  });
  console.log(result);
  // console.log(`${email} 이메일로 ${template} 를 전송합니다.`);
}
