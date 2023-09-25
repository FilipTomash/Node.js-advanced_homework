import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @Length(3,30)
  firstName: string;
  
  @Length(3,30)
  @IsString()
  lastName: string;
  
  @IsNumber()
  @Min(0)
  salary: number;

  @IsNumber()
  @Min(0)
  ranking: number;

  @IsString()
  @IsOptional()
  team: string
}
