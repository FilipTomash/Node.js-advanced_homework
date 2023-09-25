import { IsArray, IsOptional, IsString } from 'class-validator';
import { Player } from 'src/players/player.entity';

export class CreateMatchDto {
  @IsString()
  league: string;
  @IsString()
  time: string;
  @IsString()
  result: string;

  @IsOptional()
  @IsArray()
  playerIds: string[];

  @IsOptional()
  @IsArray()
  teamIds: string[];
}
