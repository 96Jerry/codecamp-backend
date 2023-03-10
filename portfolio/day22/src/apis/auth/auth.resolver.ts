import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bycrpt from 'bcrypt';
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
    // 로그인(일치하는 유저가 있는지?)
    const user = await this.userService.findOneWithEmail({ email });
    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다.');
    }
    const isAuth = await bycrpt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('암호가 틀렸습니다.');
    }
    return this.authService.getAccessToken({ user });
  }
}
