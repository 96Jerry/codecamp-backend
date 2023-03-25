import {
  CACHE_MANAGER,
  Inject,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bycrpt from 'bcrypt';
import { AuthService } from './auth.service';
import {
  GqlAuthRefreshGuard,
  GqlAuthAccessGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  @Mutation(() => [String])
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    // 로그인
    // (일치하는 유저가 있다면 accesstoken(여기에선 JWT)을 만들어서 브라우저에 전달)
    const user = await this.userService.findOneWithEmail({ email });
    // console.log(context.res.setHeader);

    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다.');
    }
    const isAuth = await bycrpt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('암호가 틀렸습니다.');
    }

    const refreshToken = this.authService.setRefreshToken({
      user,
      res: context.res,
    });
    // jwt를 브라우저에 전달하는 과정
    const accessToken = this.authService.getAccessToken({ user });

    return [accessToken, refreshToken];
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(
    @Context() context: any, //
  ) {
    const refreshToken = context.req.headers.refreshtoken;
    // const refreshToken = '1';
    const accessToken = context.req.headers.authorization.replace(
      'bearer ',
      '',
    );
    // accesstoken, refreshtoken을 받아서 검증, redis에 저장, 저장 성공 후 "저장에 성공" 출력
    // return this.authService.verifyToken({ context });
    // 검증해서 아니면 에러 발생
    this.authService.verifyToken({ refreshToken, accessToken });
    await this.cacheManager.set('refreshToken', refreshToken, {
      ttl: 120,
    });
    // const aaa = await this.cacheManager.get('refreshToken');
    // console.log(aaa);
    await this.cacheManager.set('accessToken', accessToken, {
      ttl: 120,
    });
    return '로그아웃 성공';
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser, //
    @Context() context: any,
  ) {
    return this.authService.getAccessToken({
      user: currentUser,
    });
  }
}
