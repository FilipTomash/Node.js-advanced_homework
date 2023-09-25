import { Manager } from 'src/manager/manager.entity';
import { Match } from 'src/matches/match.entity';
import { Player } from 'src/players/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column()
  budget: number;
  @Column()
  ranking: number;

  @OneToOne(() => Manager, (manager) => manager.team)
  @JoinColumn()
  manager: Manager;

  @OneToMany(() => Player, (player) => player.team) players: Player[];

  @ManyToMany(() => Match, (match) => match.teams) matches: Match[];
}
