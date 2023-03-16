import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import axios from 'axios';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentServices } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentServices: PaymentServices, //
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async createPayment(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 결제가 완료되었는지 확인
    const token = await this.iamportService.getToken();
    // console.log('겟토큰 완료');
    await this.iamportService.checkPaid({ impUid, amount, token });
    // console.log('체크페이드 완료');
    // impUid 는 한개만 존재해야한다.
    await this.paymentServices.checkDuplicate({ impUid });
    // console.log('듀플 완료');
    return this.paymentServices.create({ impUid, amount, currentUser });
  }

  // 결제 table 은 히스토리가 중요하기 때문에 insert only table 이다.
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async cancelPayment(
    @Args('impUid') impUid: string, //
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 이미 결제 취소가 되어있는지 확인, 이미 취소됐다면 Unprocessable 에러 발생
    await this.paymentServices.checkAlreadyCanceled({ impUid });
    await this.paymentServices.checkHasCancelablePoint({ impUid, currentUser });
    // iamport 에서 취소하고 database 에서도 취소해주기
    const token = await this.iamportService.getToken();
    const canceledAmount = await this.iamportService.cancel({ impUid, token });
    return await this.paymentServices.cancel({
      impUid,
      amount: canceledAmount,
      currentUser,
    });
  }
}
