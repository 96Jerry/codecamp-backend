import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn('uuid')
  productDetailId: string;

  @Column()
  description: string;

  @Column()
  kcal: number;
}
