import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1. 로그인(이메일과 비밀번호가 일치하는 유저를 DB에서 찾기)
    const user = await this.userService.findOne({ email });
    // 2. 일치하는 유저가 없으면? error 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    // 3. 일치하는 유저가 있지만 비밀번호가 틀렸다면 error 던지기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
    // 4. 일치하는 유저가 있으면? accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.authService.getAccessToken({ user });
  }
}
