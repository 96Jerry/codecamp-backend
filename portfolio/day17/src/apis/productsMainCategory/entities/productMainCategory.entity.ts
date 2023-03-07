import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductMainCategory {
  @PrimaryGeneratedColumn('uuid')
  productMainCategoryId: string;

  @Column()
  name: string;
}
