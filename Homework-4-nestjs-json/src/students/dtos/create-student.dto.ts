import { IsNumber, IsString } from 'class-validator';
export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;
}
