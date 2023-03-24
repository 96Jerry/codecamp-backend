import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

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
    @Context() context: any,
  ) {
    // 1. 로그인(이메일과 비밀번호가 일치하는 유저를 DB에서 찾기)
    const user = await this.userService.findOne({ email });

    // 2. 일치하는 유저가 없으면? error 던지기
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnprocessableEntityException('이메일이나 암호가 틀렸습니다.');
    }

    // 3. 일치하는 유저가 있으면? accessToken(=JWT)을 만들어서 브라우저에 전달하기
    this.authService.setRefreshToken({ user, res: context.res });
    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: any, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
