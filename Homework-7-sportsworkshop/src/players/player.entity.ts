import { Match } from 'src/matches/match.entity';
import { Team } from 'src/team/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  salary: number;
  @Column()
  ranking: number;

  @ManyToOne(() => Team, (team) => team.players) @JoinColumn() team: Team;

  @ManyToMany(() => Match, (match) => match.players) matches: Match[];
}
