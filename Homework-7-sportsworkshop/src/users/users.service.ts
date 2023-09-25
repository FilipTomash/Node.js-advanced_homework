import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User) private userRepo: Repository<User>;
  async findUserById(id: string) {
    const foundUser = await this.userRepo.findOneBy({ id });
    if (!foundUser) throw new NotFoundException('User not found');
    return foundUser;
  }
  async findUserByEmail(email: string) {
    const foundUser = await this.userRepo.findOneBy({ email });
    return foundUser;
  }

  async createUser(userData: CreateUserDto) {
    const newUser = this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  }
}
