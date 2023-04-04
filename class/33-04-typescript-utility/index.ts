interface Iprofile {
  name: string;
  age: 13;
  school: string;
  hobby?: string;
}

// type Aaa = {
//   name: string;
//   age: 13;
//   school: string;
//   hobby?: string;
// };

// interface Iprofile{
//     apple: number;
// }

// // 선언병합
// const bbb: Iprofile = {

// }

//
//
// 타입의 종류
// 1. Partial
type MyType1 = Partial<Iprofile>;

// 2. Required
type MyType2 = Required<Iprofile>;

// 3. Pick
type MyType3 = Pick<Iprofile, "name" | "age">;

// 4. Omit
type MyType4 = Omit<Iprofile, "school">;

// 5. Record
type ZZZ = "aaa" | "qqq" | "rrr"; // 유니온타입
type MyType5 = Record<ZZZ, string>;

// 유니온 타입을 만들려면..? => "name" | "age" | "school" | "hobby"
const qqq: keyof Iprofile;
qqq === "name";
