
import { Allergy } from 'src/apis/allergies/entities/allergy.entity';
import { ProductSubCategory } from 'src/apis/productSubCategory/entities/productSubCategory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column()
  name: string;

  @ManyToOne(() => ProductSubCategory)
  allergy: ProductSubCategory;

  @JoinColumn()
  @ManyToMany(() => Allergy[], (allergies) => allergies.products)
  allergies: Allergy[]

}
