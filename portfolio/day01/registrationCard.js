export function checkType(registrationNumber){
    if (registrationNumber.indexOf('-') == -1){
        console.log("에러발생!!! 형식이 올바르지 않습니다!!!");
        return false;
    }
    else {
        return true;
    }
}

export function checkLength(frontWord, backWord){
    if (frontWord.length != 6 || backWord.length != 7){
        console.log("에러발생!!! 개수를 제대로 입력해주세요!!!");
        return false;
    }
    else {
        return true;
    }
}

export function changeBackword(frontWord, backWord){
    var f = backWord.substr(0,1);
    var result = frontWord + '-' + f + "******";
    console.log(result);
}
