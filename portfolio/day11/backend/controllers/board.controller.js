import { GetData } from "./services/board.services.js";

export class BoardController {
  getBoard = (req, res) => {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const getData = new GetData();
    res.send(getData.result); // 2. 꺼내온 결과 응답 주기
  };
  postBoard = (req, res) => {
    console.log(req.body);
    // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기

    // 2. 저장 결과 응답주기
    res.send("게시물 저장에 성공하였습니다.");
  };
}
