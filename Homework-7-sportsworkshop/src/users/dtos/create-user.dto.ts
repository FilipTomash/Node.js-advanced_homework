import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @Length(3, 30)
  password: string;
}
