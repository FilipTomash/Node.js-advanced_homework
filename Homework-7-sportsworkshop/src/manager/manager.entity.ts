import { Team } from 'src/team/team.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  age: number;
  @Column()
  salary: number;
  @Column()
  yearsOfExperience: number;

  @OneToOne(()=>Team, (team)=>team.manager) 
  team:Team
}
