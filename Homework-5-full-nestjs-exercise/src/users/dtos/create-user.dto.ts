import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @Length(3, 30)
  password: string;

  @IsString()
  @Length(2, 20)
  firstName: string;

  @IsString()
  @Length(2, 20)
  lastName: string;

  @IsNumber()
  @Min(18)
  age: number;
}
