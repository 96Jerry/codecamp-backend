import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import 'dotenv/config';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
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
