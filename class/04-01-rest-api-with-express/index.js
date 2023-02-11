import express from "express";
const app = express();
//const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//api 서버 실행
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
