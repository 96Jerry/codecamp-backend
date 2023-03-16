import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentServices {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}
  async create({
    impUid,
    amount,
    currentUser,
    status = PAYMENT_STATUS_ENUM.PAYMENT,
  }) {
    const payment = this.paymentRepository.create({
      impUid: impUid,
      amount: amount,
      status,
      user: currentUser,
    });
    // console.log('페이먼트===', payment);
    await this.paymentRepository.save(payment);

    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });
    // console.log('유저===', user);
    // console.log(currentUser);
    await this.userRepository.save({
      ...user,
      point: amount + user.point,
    });

    return payment;
  }

  async checkDuplicate({ impUid }) {
    const result = await this.paymentRepository.findOneBy({ impUid });

    if (result) {
      throw new ConflictException('이미 결제된 아이디입니다.');
    }
  }

  async checkAlreadyCanceled({ impUid }) {
    // const payment = await this.paymentRepository.findOne({ where: { impUid } });
    const payment = await this.paymentRepository.findOne({
      where: { impUid: impUid, status: PAYMENT_STATUS_ENUM.CANCEL },
    });
    // console.log(user);
    if (payment)
      throw new UnprocessableEntityException('이미 취소된 결제입니다.');
  }

  async checkHasCancelablePoint({ impUid, currentUser }) {
    const payment = await this.paymentRepository.findOne({
      where: {
        impUid,
        user: { id: currentUser.id },
        status: PAYMENT_STATUS_ENUM.PAYMENT,
      },
    });
    if (!payment)
      throw new UnprocessableEntityException('결제한 기록이 없습니다.');

    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });
    if (user.point < payment.amount)
      throw new UnprocessableEntityException('포인트가 부족합니다.');
  }
  async cancel({ impUid, amount, currentUser }) {
    const payment = await this.create({
      impUid,
      amount: -amount,
      currentUser,
      status: PAYMENT_STATUS_ENUM.CANCEL,
    });
    return payment;
  }
}
