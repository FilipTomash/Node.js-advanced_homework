import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dtos/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async registerUser(userData: CreateUserDto) {
    const user = await this.usersService.findUserByEmail(userData.email);
    if (user) throw new BadRequestException('Email already in use');
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    userData.password = hashedPassword;
    await this.usersService.createUser(userData);
  }
  async loginUser(credentials: CredentialsDto) {
    const user = await this.usersService.findUserByEmail(credentials.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPassportValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!isPassportValid)
      throw new UnauthorizedException('Invalid credentials');
    const { password, ...userWithoutPassword } = user;
    const token = this.jwtService.signAsync(userWithoutPassword);
    return token;
  }
}
