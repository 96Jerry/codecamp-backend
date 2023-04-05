import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, Repository } from 'typeorm';
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

    private readonly datasource: DataSource,
  ) {}
  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.datasource.createQueryRunner();
    queryRunner.connect();

    // ====================transaction 시작===============================
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1. pointTransaction table 에 거래기록 1줄 생성
      // .save 와 달리 .create 는 DB 에 가지 않는다. 객체가 만들어질 뿐
      // 바로 .save 하는게 이 경우에는 더 좋다.
      const pointTransaction = this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransactionRepository.save(pointTransaction); // queryRunner에 모든걸 저장해야한다.
      await queryRunner.manager.save(pointTransaction);

      // throw new Error('강제로 에러 발생');
      // 2. user의 돈 찾아오기
      // const user = await this.userRepository.findOneBy({ id: currentUser.id });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: currentUser.id },
        lock: { mode: 'pessimistic_write' },
      });

      // 3. user의 돈 업데이트
      // await this.userRepository.update(
      //   { id: user.id },
      //   { point: user.point + amount },
      // );
      const updateUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updateUser); // queryRunner에 모든걸 저장한다

      // ===========================commit 성공 확정==============================
      await queryRunner.commitTransaction();

      // 4. 최종결과 frontend 에 돌려주기
      return pointTransaction;
    } catch (error) {
      // ==============================rollback 되돌리기======================
      queryRunner.rollbackTransaction();
    } finally {
      // ==========================연결 해제=============================
      await queryRunner.release();
    }
  }
}
