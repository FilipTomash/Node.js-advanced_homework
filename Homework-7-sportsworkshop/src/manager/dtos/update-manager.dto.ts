import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateManagerDto {
  @IsOptional()
  @IsString()
  @Length(3,30)
  firstName: string;
  
  @IsOptional()
  @Length(3,30)
  @IsString()
  lastName: string;
  
  @IsOptional()
  @IsNumber()
  @Min(18)
  age: number;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  salary: number;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  yearsOfExperience: number;
}
