const fetchData = async () => {
  console.time("===개별promise각각===");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 3000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 1000);
  });
  console.timeEnd("===개별promise각각===");
  console.log("드디어 모두 끝");
};

// fetchData();

const fetchData2 = async () => {
  console.time("===한방promise.all===");
  await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 2000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 3000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 1000);
    }),
  ]);
  console.timeEnd("===한방promise.all===");
  console.log("드디어 모두 끝");
};

fetchData2();
