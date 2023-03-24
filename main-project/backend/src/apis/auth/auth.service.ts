import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}
  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1d' },
    );

    return accessToken;
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
    return refreshToken;
  }

  verifyToken({ refreshToken, accessToken }) {
    // const refreshToken = context.req.headers.refreshtoken;
    // const accessToken = context.req.headers.authorization.replace('bearer', '');
    jwt.verify(refreshToken, 'myRefreshKey', (err, decoded) => {
      if (err) {
        throw new UnauthorizedException();
      }
    });
    jwt.verify(accessToken, 'myAccessKey', (err, decoded) => {
      if (err) {
        throw new UnauthorizedException();
      }
    });
  }

  async loginSocial({ req, res }) {
    let user = await this.userService.findOneWithEmail({
      email: req.user.email,
    });
    // console.log(req.user.email);
    // console.log(req.user.password);
    // console.log(req.user.name);
    // console.log(req.user.age);
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        password: req.user.password,
        name: req.user.name,
        age: req.user.age,
      });
    }
    this.setRefreshToken({ user, res });
    res.redirect(
      'http://127.0.0.1:5500/main-project/frontend/login/index.html',
    );
  }
}
