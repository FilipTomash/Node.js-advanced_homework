import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  @InjectRepository(Player) private playerRepo: Repository<Player>;
  getAllPlayers() {
    return this.playerRepo.find();
  }
  async findPlayerById(id: string) {
    const foundPlayer = await this.playerRepo.findOne({
      where: { id },
      relations: {
        team: true,
        matches: true,
      },
    });
    if (!foundPlayer) throw new NotFoundException('Player not found');
    return foundPlayer;
  }
  async createPlayer(playerData: CreatePlayerDto) {
    const newPlayer = this.playerRepo.create({
      ...playerData,
      team: { id: playerData?.team || null },
    });
    await this.playerRepo.save(newPlayer);
    return newPlayer;
  }
  async updatePlayer(id: string, updateData: UpdatePlayerDto) {
    const foundPlayer = await this.findPlayerById(id);
    Object.assign(foundPlayer, updateData);
    const updatedPlayer = await this.playerRepo.save(foundPlayer);
    return updatedPlayer;
  }
  async deletePlayer(id: string) {
    const foundPlayer = await this.findPlayerById(id);
    await this.playerRepo.remove(foundPlayer);
  }
}
