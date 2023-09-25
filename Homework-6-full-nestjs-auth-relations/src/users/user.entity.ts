import { Exclude } from 'class-transformer';
import { Address } from 'src/addresses/address.entity';
import { Order } from 'src/orders/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  age: number;

  @OneToMany(() => Order, (order) => order.user) orders: Order[];

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn()
  address: Address;
}
