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

// 버킷에 새로 저장된 이미지 파 
createThumbnail = () => {
  console.log("a");
};
