import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('products')
export class productEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column({ default: 'available' })
  status: string;
}
