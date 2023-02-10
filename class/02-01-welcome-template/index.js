function getWelcomeTemplate(name, age, school, createdAt){
    const result = `
    <html>
        <body>
            <h1>${name}님 가입을 환영합니다.</h1>
            <hr />
            <div>이름: ${name}</div>
            <div>나이: ${age}살</div>
            <div>학교: ${school}</div>
            <div>가입일: ${createdAt}</div>

        </body>

    </html>
    `
    console.log(result)
}

const myname = "영희"
const myage = 12
const myschool = "토끼초등학교"
const mycreatedAt = "2020-01-02"

getWelcomeTemplate(myname, myage, myschool, mycreatedAt)

// 문제점 : 변수가 많아지면 코드가 길고 복잡해짐
// 방지하기 위해 객체로 담아서 전달