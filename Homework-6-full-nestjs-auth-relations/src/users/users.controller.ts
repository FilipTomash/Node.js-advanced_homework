import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }
  @Get('/email')
  async findUserByEmail(@Body() email: string) {
    console.log(email);
    const user = await this.usersService.findUserByEmail(
      String(Object.values(email)),
    );
    if (!user)
      throw new NotFoundException(
        `User with the mail ${Object.values(email)} not found`,
      );
    return user;
  }
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    if (!user) throw new NotFoundException(`User with the id ${id} not found`);
    return user;
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.usersService.updateUser(id, updateData);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
