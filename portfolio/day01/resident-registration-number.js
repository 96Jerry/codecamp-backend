import {checkType, checkLength, changeBackword} from "./registrationCard.js";

function customRegistrationNumber(registrationNumber){
    // 1. 형식 맞는지 확인 ( 가운데 - 가 들어가야함)
    const isValid1 = checkType(registrationNumber);
    if (isValid1 != 1){
        return;
    }
    // 1-1. 앞 뒤 자르고 frontWord, backWord 만들기
    var frontWord = registrationNumber.split('-')[0];
    var backWord = registrationNumber.split('-')[1];
    // 2. 자리수 맞는지 확인 (앞 6자리, 뒤 7자리)
    const isValid2 = checkLength(frontWord, backWord);
    // 3. 오류 없다면 뒷자리 가리고 출력
    if (isValid1 && isValid2){
        changeBackword(frontWord,backWord);
    }
}

customRegistrationNumber("210510-1010101");