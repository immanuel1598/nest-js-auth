import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  validate(email: string, password: string) {
    if (password === "")
      throw new UnauthorizedException('please provide Password');
    return this.authService.validateUser(email, password);
  }
}
 