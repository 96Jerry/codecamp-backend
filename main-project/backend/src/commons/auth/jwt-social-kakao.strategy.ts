import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: '53a4c8b6444eaa8886141b7367604beb',
      callbackURL: 'http://localhost:3000/login/kakao',
    });
  }

  validate(accessToken, refreshToken, profile, done) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    const user = {
      email: profile._json.kakao_account.email,
      password: '1234567890',
      name: profile._json.properties.nickname,
      age: 0,
    };
    return done(null, user);
  }
}
