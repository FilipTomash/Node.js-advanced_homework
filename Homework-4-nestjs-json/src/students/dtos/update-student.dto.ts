import { IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  age: number;
}
