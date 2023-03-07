import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSubCategory {
  @PrimaryGeneratedColumn('uuid')
  productSubCategoryId: string;

  @Column()
  name: string;
}
