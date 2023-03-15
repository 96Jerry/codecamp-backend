import { ConflictException, Injectable } from '@nestjs/common';
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
  async create({ impUid, amount, currentUser }) {
    const payment = this.paymentRepository.create({
      impUid: impUid,
      amount: amount,
      status: PAYMENT_STATUS_ENUM.PAYMENT,
      user: currentUser,
    });
    await this.paymentRepository.save(payment);

    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });
    // console.log(currentUser);
    await this.userRepository.save({
      ...user,
      point: amount + user.point,
    });

    return payment;
  }

  checkDuplicate({ impUid }) {
    const result = this.paymentRepository.findOneBy({ impUid });
    if (result) {
      throw new ConflictException('이미 결제된 아이디입니다.');
    }
  }
}
