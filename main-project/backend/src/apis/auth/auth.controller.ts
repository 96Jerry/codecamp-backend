import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
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
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://127.0.0.1:5500/main-project/frontend/login/index.html',
    );
  }
}
