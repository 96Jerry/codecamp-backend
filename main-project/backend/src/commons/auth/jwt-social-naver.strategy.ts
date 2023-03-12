import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: 'lkYS7uV1Yn32hSRWi3YN',
      clientSecret: '2fxyiL1qaQ',
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile, done) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    const user = {
      email: profile._json.email,
      password: '1234567890',
      name: profile._json.nickname,
      age: 0,
    };
    return done(null, user);
  }
}
