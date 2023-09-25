import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  registerUser(@Body() userData: CreateUserDto) {
    return this.authService.registerUser(userData);
  }
  @Post('/login')
  async loginUser(@Body() credentials: CredentialsDto, @Res() response) {
    const token = await this.authService.loginUser(credentials);
    response.set('authorization', token);
    return response.sendStatus(200);
  }
}
