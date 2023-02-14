import axios from "axios";

// 비동기식
function fetchPost() {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log(result); // Promise
}
fetchPost();

// 동기식
async function fetchPost2() {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log(result.data.content); // 실제 데이터
}
fetchPost2();
