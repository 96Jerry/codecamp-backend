console.log("안녕하세요");

// const fetchData = () => {
//   console.log("여기는 1번");
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         resolve("성공시 받는 데이터");
//       } catch (e) {
//         reject("실패했습니다.");
//       }
//     }, 2000);
//   }).then((res) => console.log("여기는 2번"));
//   console.log("여기는 3번");
// };

// fetchData();

// 안녕하세요
// 여기는 1번
// 여기는 3번
// 여기는 2번

const fetchData = async () => {
  console.log("여기는 1번");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve("성공시 받는 데이터");
      } catch (e) {
        reject("실패했습니다.");
      }
    }, 2000);
  }).then((res) => console.log("여기는 2번"));
  console.log("여기는 3번");
};

fetchData();
