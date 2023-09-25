import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User) private userRepo: Repository<User>;
  findAllUsers() {
    return this.userRepo.find();
  }
  async findUserByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }
  async findUserById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: { address: true },
    });
    return user;
  }
  async createUser(userData: CreateUserDto) {
    const newUser = this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  }
  async saveUser(saveUpdate: UpdateUserDto) {
    await this.userRepo.save(saveUpdate);
  }
  async updateUser(id: string, updateData: UpdateUserDto) {
    const foundUser = await this.findUserById(id);
    if (updateData.password)
      throw new BadRequestException('Can`t change password from here');
    if (updateData.email)
      throw new BadRequestException('Can`t change email at all');
    Object.assign(foundUser, updateData);
    await this.userRepo.save(foundUser);
    return foundUser;
  }
  async deleteUser(id: string) {
    const foundUser = await this.findUserById(id);
    await this.userRepo.remove(foundUser);
  }
}
