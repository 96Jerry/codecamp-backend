console.log("안녕하세요~~")

function getToken(a){
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
}

getToken(10)