function aaa() {
  email = "support@codebootcamp.co.kr";
  securityNumber = "210510-1******";
  phoneNumber = "010-0000-0000";
  favSite = "codebootcamp.co.kr";

  const result = `
    <html>
        <body>
            <h1>코드캠프 가입을 환영합니다.</h1>
            <hr>
            <div>이메일: ${email}</div>
            <div>주민번호: ${securityNumber}</div>
            <div>휴대폰 번호: ${phoneNumber}</div>
            <div>내가 좋아하는 사이트: ${favSite}</div>
        </body>
    </html>
        `;

  console.log(result);
}

aaa();
