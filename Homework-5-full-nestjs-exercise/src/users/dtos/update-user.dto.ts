import { IsString, Length, Min, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto {
  readonly email: string;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  password: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  lastName: string;

  @IsOptional()
  @IsNumber()
  @Min(18)
  age: number;
}
