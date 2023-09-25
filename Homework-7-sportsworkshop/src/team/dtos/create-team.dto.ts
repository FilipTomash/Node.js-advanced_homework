import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsNumber()
  @Min(0)
  budget: number;

  @IsNumber()
  @Min(0)
  ranking: number;

  @IsOptional()
  @IsString()
  managerId: string;

  @IsOptional()
  @IsArray()
  playerId: string[];
}
