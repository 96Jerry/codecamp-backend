import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateStarbucksService {
  // aaa() {
  //   return 'Hello';
  // }
  findAll() {
    const result = [
      {
        menu: '아메리카노',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
    ];
    return result;
  }
  create() {
    return '등록에 성공하였습니다.';
  }
}
