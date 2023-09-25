import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto copy';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User) private userRepo: Repository<User>;
  getAllUsers() {
    return this.userRepo.find();
  }
  async getUserById(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    // console.log(email);
    // if (!user) throw new NotFoundException();
    return user;
  }
  async createUser(userData: CreateUserDto) {
    const newUser = this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  }
  async updateUser(id: string, updateData: UpdateUserDto) {
    const foundUser = await this.getUserById(id);
    Object.assign(foundUser, updateData);
    if (updateData.password)
      throw new BadRequestException('Cant change password here');
    // Email cant be changed at all
    // Password can be changed in auth.service on separate endpoint
    await this.userRepo.save(foundUser);
  }
  async saveUser(data: UpdateUserDto) {
    await this.userRepo.save(data);
  }
  async deleteUser(id: string) {
    const foundUser = await this.getUserById(id);
    await this.userRepo.remove(foundUser);
  }
}
