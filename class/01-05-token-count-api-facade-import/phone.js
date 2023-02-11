export function checkValidationPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(6, "0");
  return result;
  // console.log(result)
}

export function sendTokenToSMS(fff, ggg) {
  console.log(fff + "번호로 인증번호" + ggg + "를 전송합니다!!");
}
