import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dtos/credentials.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  // register(create) user
  async registerUser(userData: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userData.email);
    if (user) throw new BadRequestException('Email already exists');
    const hashedPassword = await bcrypt.hash(userData.password, 8);

    userData.password = hashedPassword;
    await this.usersService.createUser(userData);
  }
  async loginUser(credentials: CredentialsDto) {
    const user = await this.usersService.getUserByEmail(credentials.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async changePassword(id: string, newPass: UpdateUserDto) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new UnauthorizedException('User not found');
    console.log(newPass);
    const hashedPassword = await bcrypt.hash(newPass.password, 8);

    user.password = hashedPassword;
    await this.usersService.saveUser(user);
  }
}
