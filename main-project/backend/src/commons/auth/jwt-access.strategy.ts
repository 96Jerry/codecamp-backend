import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, //
  ) {
    super({
      // 인가 과정, 부모 class에 적용시켜주는 super
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }
  // 인가에 성공했다면 payload 부분에 getaccestoken에서 jwt 생성시 넣어줬던 email 과 sub를 넣어준다.
  //   async validate(payload) {
  //     // return 을 하게되면 req.user 부분에 다음 값을 넣어준다. ex) req.header 에는 bearer 가 들어있다.
  //     // console.log(payload);
  //     // 하나라도 없으면 에러 발생
  //     return {
  //       email: payload.email,
  //       id: payload.sub,
  //     };
  //   }
  // }
  async validate(req, payload) {
    // console.log(req.headers);
    const refreshToken = req.headers.refreshtoken;
    const accessToken = req.headers.authorization.replace('bearer ', '');
    // return 을 하게되면 req.user 부분에 다음 값을 넣어준다. ex) req.header 에는 bearer 가 들어있다.
    // console.log(payload);
    const refreshInfo = await this.cacheManager.get('refreshToken');
    const accessInfo = await this.cacheManager.get('accessToken');
    // console.log(refreshInfo);
    // redis에서 가져온 값과 req 안의 값이 같으면 에러 발생, access와 refresh 둘중 하나라도 같으면 발생
    if (refreshInfo === refreshToken || accessInfo === accessToken) {
      throw new UnauthorizedException();
    } else {
      return {
        email: payload.email,
        id: payload.sub,
      };
    }
  }
}
