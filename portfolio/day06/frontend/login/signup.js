// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  // 휴대폰 인증번호 발급 api 요청
  const ccc =
    "010" +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;
  axios
    .post("http://localhost:3000/validationNumber", { aaa: ccc })
    .then((res) => {
      console.log(res.data);
    });
  console.log("인증 번호 전송");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value;
  const personal = document.getElementById("SignupPersonal").value;
  const phone =
    "010" +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;
  const prefer = document.getElementById("SignupPrefer").value;
  const password = document.getElementById("SignupPwd").value;
  const email = document.getElementById("SignupEmail").value;

  // 정보 보내기 api
  axios
    .post("http://localhost:3000/userInfo", {
      myuser: { name, personal, phone, prefer, password, email },
    })
    .then((res) => {
      console.log(res.data);
    });
  console.log("회원 가입 이메일 전송");
};
