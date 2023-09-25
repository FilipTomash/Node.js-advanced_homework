import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsString()
  league: string;
  @IsOptional()
  @IsString()
  time: string;
  @IsOptional()
  @IsString()
  result: string;
  @IsOptional()
  @IsArray()
  players: [];
}
