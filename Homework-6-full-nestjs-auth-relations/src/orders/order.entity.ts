import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Product, (product) => product.orders, { eager: true })
  @JoinTable()
  products: Product[];
}
