import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  stock: number;
  @Column()
  price: number;
}
