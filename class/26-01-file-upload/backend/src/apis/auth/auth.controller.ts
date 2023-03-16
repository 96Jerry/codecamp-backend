import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  loginGoogle() {
    // 구글 로그인 진행
    console.log('안녕하세요.');
  }
}
