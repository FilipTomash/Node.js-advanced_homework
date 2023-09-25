import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Credentials } from './dtos/credentials.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { JwtService } from '@nestjs/jwt';

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
    console.log(user);
    const newUser = await this.usersService.createUser(userData);
    return newUser;
  }

  async changePassword(id: string, userData: UpdateUserDto) {
    const user = await this.usersService.findUserById(id);
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    // console.log(hashedPassword);
    user.password = hashedPassword;
    const updatedPasswordOnUser = await this.usersService.saveUser(user);
    console.log(updatedPasswordOnUser);
    return updatedPasswordOnUser;
  }

  async loginUser(credentials: Credentials) {
    const user = await this.usersService.findUserByEmail(credentials.email);
    if (!user) throw new UnauthorizedException('Invalid credentialsM');

    const isPassportValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!isPassportValid)
      throw new UnauthorizedException('Invalid credentialsP');
    const { password, ...userWithoutPassword } = user;
    const token = await this.jwtService.signAsync(userWithoutPassword);

    return token;
  }
}
