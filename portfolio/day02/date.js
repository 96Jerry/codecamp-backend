function ccc(number) {
  return String(number).padStart(2, "0");
}

function aaa() {
  bbb = new Date();
  year = bbb.getFullYear();
  month = ccc(bbb.getMonth() + 1);
  day = ccc(bbb.getDate());
  time1 = ccc(bbb.getHours());
  time2 = ccc(bbb.getMinutes());
  time3 = ccc(bbb.getSeconds());
  console.log(
    `오늘은 ${year}년 ${month}월 ${day}일 ${time1}:${time2}:${time3}입니다.`
  );
}

aaa();
