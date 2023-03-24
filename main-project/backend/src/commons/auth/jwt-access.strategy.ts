import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // 인가 과정, 부모 class에 적용시켜주는 super
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    });
  }
  // 인가에 성공했다면 payload 부분에 getaccestoken에서 jwt 생성시 넣어줬던 email 과 sub를 넣어준다.
  validate(payload) {
    // return 을 하게되면 req.user 부분에 다음 값을 넣어준다. ex) req.header 에는 bearer 가 들어있다.
    // console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
