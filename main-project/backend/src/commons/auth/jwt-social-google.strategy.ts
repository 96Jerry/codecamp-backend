import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '279505273220-7l09a5m5u2rp9dre2at4uoraqaar55h1.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    return {
      email: profile.emails[0].value,
      password: '1234567890',
      name: profile.displayName,
      age: 0,
    };
  }
}
