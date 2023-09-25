import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';

@Injectable()
export class TeamService {
  @InjectRepository(Team) private teamRepo: Repository<Team>;
  getAllTeams() {
    return this.teamRepo.find();
  }
  async findTeamById(id: string) {
    const foundTeam = await this.teamRepo.findOne({
      where: { id },
      relations: { manager: true, players: true },
    });
    if (!foundTeam) throw new NotFoundException('Team not found');
    return foundTeam;
  }
  async createTeam(teamData: CreateTeamDto) {
    const newTeam = this.teamRepo.create({
      ...teamData,
      manager: { id: teamData.managerId },
      players: teamData.playerId.map((player) => {
        return { id: player };
      }),
    });
    await this.teamRepo.save(newTeam);
    return newTeam;
  }
  async updateTeam(id: string, updateData: UpdateTeamDto) {
    const foundTeam = await this.findTeamById(id);
    Object.assign(foundTeam, updateData);
    const updatedTeam = await this.teamRepo.save(foundTeam);
    return updatedTeam;
  }
  async deleteTeam(id: string) {
    const foundTeam = await this.findTeamById(id);
    await this.teamRepo.remove(foundTeam);
  }
}
