import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateManagerDto {
  @IsString()
  @Length(3,30)
  firstName: string;
  
  @Length(3,30)
  @IsString()
  lastName: string;
  
  @IsNumber()
  @Min(18)
  age: number;
  
  @IsNumber()
  @Min(0)
  salary: number;

  @IsNumber()
  @Min(0)
  yearsOfExperience: number;
}
