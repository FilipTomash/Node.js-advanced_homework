import { IsEmail, IsString } from 'class-validator';

export class Credentials {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
