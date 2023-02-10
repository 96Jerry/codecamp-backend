console.log("안녕하세요~~")

function createTokenOfPhone(myphone){
    // 1. 휴대폰 자리수 맞는지 확인
    if (myphone.length !== 10 && myphone.length !== 11){
        console.log("에러발생! 휴대폰 번호를 제대로 입력해주세요.")
        return
    }
    // 2. 휴대폰 토큰 만들기
    const a = 6
    if(a===undefined){
        console.log("에러발생! 개수를 제대로 입력해주세요.")
        return
    } else if(a <= 0){
        console.log("에러발생! 개수가 너무 적습니다.")
        return
    } else if(a > 10){
        console.log("에러발생! 개수가 너무 많습니다.")
        return
    }

    const result = String(Math.floor(Math.random()*10**a)).padStart(a,"0")
    console.log(result)

    // 3. 휴대폰에 토큰 전송하기
    console.log(myphone + "번호로 인증번호" +result + "를 전송합니다.")

}

createTokenOfPhone("01012345678")