console.log("안녕하세요~~")

function getToken(a){
    const result = String(Math.floor(Math.random()*10**a)).padStart(a,"0")
    console.log(result)
}

getToken(4)