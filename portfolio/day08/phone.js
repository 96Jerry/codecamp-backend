import crypto from "crypto";

export function createValidationPhone() {
  let [randomNumber] = crypto.getRandomValues(new Uint32Array(1));
  randomNumber = String(randomNumber).substr(0, 6).padStart(6, "0");
  console.log(randomNumber);
  return randomNumber;
}
