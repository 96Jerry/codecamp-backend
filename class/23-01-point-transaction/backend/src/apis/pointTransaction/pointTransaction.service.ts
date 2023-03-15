import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
  ) {}
  async create({ impUid, amount, currentUser }) {
    // 1. pointTransaction table 에 거래기록 1줄 생성
    // .save 와 달리 .create 는 DB 에 가지 않는다. 객체가 만들어질 뿐
    // 바로 .save 하는게 이 경우에는 더 좋다.
    const pointTransaction = this.pointTransactionRepository.create({
      impUid: impUid,
      amount: amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointTransactionRepository.save(pointTransaction);
    // 2. user의 돈 찾아오기
    const user = await this.userRepository.findOneBy({ id: currentUser.id });
    // 3. user의 돈 업데이트
    await this.userRepository.update(
      { id: user.id },
      { point: user.point + amount },
    );
    // 4. 최종결과 frontend 에 돌려주기
    return pointTransaction;
  }
}
