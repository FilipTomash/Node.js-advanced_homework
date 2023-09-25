import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Credentials } from './dtos/credentials.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  registerUser(@Body() userData: CreateUserDto) {
    return this.authService.registerUser(userData);
  }
  @Patch('/change/:id')
  changePassword(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.authService.changePassword(id, userData);
  }
  @Post('/login')
  @HttpCode(200)
  async loginUser(@Body() credentials: Credentials, @Res() response) {
    const token = await this.authService.loginUser(credentials);
    response.set('authorization', token);
    return response.sendStatus(200);
  }
}
