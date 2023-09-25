import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // turn request from the extractToken function into http
      const request = context.switchToHttp().getRequest();
      // extract the token
      const token = this.extractToken(request);
      // verify and extract payload from token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });
      // see if there is still the user in db
      await this.usersService.findUserById(payload.id);
      return true;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException();
    }
  }
  private extractToken(request: Request) {
    const token = request.headers['authorization'].split(' ')[1];
    return token;
  }
}
