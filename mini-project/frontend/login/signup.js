// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const ccc =
    "010" +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;

  const phoneData = await axios.post("http://localhost:3000/tokens/phone", {
    aaa: ccc,
  });
  console.log(phoneData.data);
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const ccc =
    "010" +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;
  const ddd = document.getElementById("TokenInput").value;
  const validationData = await axios.patch(
    "http://localhost:3000/tokens/phone",
    {
      aaa: ccc,
      bbb: ddd,
    }
  );
  console.log(validationData.data);
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 완료");
};
