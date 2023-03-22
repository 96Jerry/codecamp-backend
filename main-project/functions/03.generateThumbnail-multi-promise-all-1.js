const sharp = require("sharp");
const { Storage } = require("@google-cloud/storage");
// event : event payload
// context : metadata for the event

exports.generateThumbnail = async (event, context) => {
  // 1. event, context 로그로 표시
  console.log("hello world");
  console.log("=====");
  console.log("context:", context);
  console.log("event", event);
  console.log("=====");

  // 2. 이미 썸네일이 있는 경우 종료(즉 ,썸네일로 트리거가 된 경우)
  if (event.name.includes("thumb/")) return;
  // sharp().resize({ width: 320 });
  // 3. event 안의 file 을 활용하여 썸네일 생성, 생성한 썸네일 재업로드
  const storage = new Storage().bucket(event.bucket);
  await Promise.all([
    new Promise((resolve, reject) => {
      storage
        .file(event.name)
        .createReadStream()
        .pipe(sharp().resize({ width: 320 }))
        .pipe(storage.file(`thumb/s/${event.name}`).createWriteStream())
        .on("finish", () => resolve())
        .on("error", () => reject());
    }),
    new Promise((resolve, reject) => {
      storage
        .file(event.name)
        .createReadStream()
        .pipe(sharp().resize({ width: 640 }))
        .pipe(storage.file(`thumb/m/${event.name}`).createWriteStream())
        .on("finish", () => resolve())
        .on("error", () => reject());
    }),
    new Promise((resolve, reject) => {
      storage
        .file(event.name)
        .createReadStream()
        .pipe(sharp().resize({ width: 1280 }))
        .pipe(storage.file(`thumb/l/${event.name}`).createWriteStream())
        .on("finish", () => resolve())
        .on("error", () => reject());
    }),
  ]);
};
