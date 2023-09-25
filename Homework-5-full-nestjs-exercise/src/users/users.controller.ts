import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  //   This route goes here (before the /:id route) not to interfere with id's
  @Get('/email')
  // Had to make this function async in order to show errors
  async getUserByEmail(@Body() email: string) {
    // Because Body returns an object, for this operation we need the value from it and thats why we extract it
    // Object.values returns an array (in our case with only one item) so that`s why we take the first and only item [0]
    const parsedMail = Object.values(email)[0];
    // console.log(Object.values(email));
    // console.log(parsedMail);
    const foundUser = await this.userService.getUserByEmail(parsedMail);
    // I had to pass the logic for NotFound to the controller because if it stays in user.service it will break things down
    // for registering user in auth.service
    if (!foundUser) throw new NotFoundException('User not found');
    console.log(foundUser);
    return foundUser;
  }
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Patch('/:id')
  updateUser(@Param('id') userId: string, @Body() updateData: UpdateUserDto) {
    return this.userService.updateUser(userId, updateData);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
