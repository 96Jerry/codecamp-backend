// // callback
// sharp(inputBuffer)
//   .resize(320, 240)
//   .toFile('output.webp', (err, info) => { ... });

//   // promise
//   sharp('input.jpg')
//   .rotate()
//   .resize(200)
//   .jpeg({ mozjpeg: true })
//   .toBuffer()
//   .then( data => { ... })
//   .catch( err => { ... });

//   // async await
//   const semiTransparentRedPng = await sharp({
//     create: {
//       width: 48,
//       height: 48,
//       channels: 4,
//       background: { r: 255, g: 0, b: 0, alpha: 0.5 }
//     }
//   })
//     .png()
//     .toBuffer();

//     // stream
//     const roundedCorners = Buffer.from(
//         '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
//       );

//       const roundedCornerResizer =
//         sharp()
//           .resize(200, 200)
//           .composite([{
//             input: roundedCorners,
//             blend: 'dest-in'
//           }])
//           .png();

//       readableStream
//         .pipe(roundedCornerResizer)
//         .pipe(writableStream);

// 버킷에 새로 저장된 이미지 받기, 크기를 조절해 버킷에 새로 저장
import { Storage } from "@google-cloud/storage";
// const {Storage} = require('@google-cloud/storage')

createThumbnail = async (images) => {
  const storage = new Storage({
    projectId: "sociallogin-380212",
    keyFilename: "sociallogin-380212-0abab84de713.json",
  }).bucket("gongcha-storage/thumb");

  const results = await Promise.all(
    waitedFiles.map((el) => {
      return new Promise((resolve, reject) => {
        el.createReadStream()
          .pipe(storage.file(el.filename).createWriteStream())
          .on("finish", () => resolve(`gongcha-storage/${el.filename}`))
          .on("error", () => reject());
      });
    })
  );
};
//
