import { Player } from 'src/players/player.entity';
import { Team } from 'src/team/team.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  league: string;
  @Column()
  time: string;
  @Column()
  result: string;
  @ManyToMany(() => Player, (player) => player.matches)
  @JoinTable()
  players: Player[];

  @ManyToMany(() => Team, (team) => team.matches)
  @JoinTable()
  teams: Team[];
}
