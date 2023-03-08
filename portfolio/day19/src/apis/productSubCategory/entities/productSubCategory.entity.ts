import { Field, ObjectType } from '@nestjs/graphql';
import { ProductMainCategory } from 'src/apis/productsMainCategory/entities/productMainCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => ProductMainCategory)
  @Field(() => ProductMainCategory)
  productMainCategory: ProductMainCategory;
}
