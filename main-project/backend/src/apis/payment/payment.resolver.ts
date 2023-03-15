import { HttpException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import axios from 'axios';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
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
    await this.iamportService.checkPaid({ impUid, amount, token });

    // impUid 는 한개만 존재해야한다.
    await this.paymentServices.checkDuplicate({ impUid });

    return this.paymentServices.create({ impUid, amount, currentUser });
  }
}
