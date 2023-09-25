import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dtos/create-match.dto';
import { UpdateMatchDto } from './dtos/update-match.dto';

@Injectable()
export class MatchesService {
  @InjectRepository(Match) private matchRepo: Repository<Match>;
  getAllMatches() {
    return this.matchRepo.find();
  }
  async findMatchById(id: number) {
    const foundMatch = await this.matchRepo.findOne({
      where: { id },
      relations: { players: true, teams: true },
    });
    if (!foundMatch) throw new NotFoundException('Match not found');
    return foundMatch;
  }
  async createMatch(matchData: CreateMatchDto) {
    const newMatch = this.matchRepo.create({
      ...matchData,
      // players: matchData.players.map((player) => {
      //   return { id: player };
      // }),
      players: matchData.playerIds.map((player) => {
        console.log(player);
        return { id: player };
      }),
      teams: matchData.teamIds.map((team) => {
        return { id: team };
      }),
    });
    await this.matchRepo.save(newMatch);
    return newMatch;
  }
  async updateMatch(id: number, updateData: UpdateMatchDto) {
    const foundMatch = await this.findMatchById(id);
    Object.assign(foundMatch, updateData);
    const updatedMatch = await this.matchRepo.save(foundMatch);
    return updatedMatch;
  }
  async deleteMatch(id: number) {
    const foundMatch = await this.findMatchById(id);
    await this.matchRepo.remove(foundMatch);
  }
}
