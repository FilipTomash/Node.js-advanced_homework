import { userInfo } from 'os';
import { User } from 'src/users/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  street: string;
  @Column()
  streetNumber: number;
  @Column()
  city: string;
  @OneToOne(() => User, (user) => user.address)
  user: User;
}
