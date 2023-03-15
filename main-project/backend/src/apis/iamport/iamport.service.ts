import {
  ConflictException,
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

export class IamportService {
  async getToken() {
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IAMPORT_API_KEY,
        imp_secret: process.env.IAMPORT_SECRET,
      });
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPaid({ impUid, amount, token }) {
    try {
      const result = await axios.get(
        'https://api.iamport.kr/payments/' + impUid,
        { headers: { Authorization: token } },
      );
      if (result.data.response.status !== 'paid') {
        throw new ConflictException('결제 내역이 존재하지 않습니다.');
      } else {
        if (result.data.response.amount !== amount)
          throw new UnprocessableEntityException('결제 금액이 잘못되었습니다.');
      }
    } catch (e) {
      if (e?.response?.data?.message) {
        throw new HttpException(e.response.data.message, e.response.status);
      } else {
        throw e;
      }
    }
  }
}
