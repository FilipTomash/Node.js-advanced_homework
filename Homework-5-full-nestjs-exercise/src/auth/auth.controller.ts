import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  registerUser(@Body() userData: CreateUserDto) {
    // console.log(userData);
    return this.authService.registerUser(userData);
  }
  @Post('/login')
  loginUser(@Body() credentials: CredentialsDto) {
    return this.authService.loginUser(credentials);
  }
  @Post('/change/:id')
  changePassword(@Param('id') id: string, @Body() newPass: UpdateUserDto) {
    return this.authService.changePassword(id, newPass);
  }
}
