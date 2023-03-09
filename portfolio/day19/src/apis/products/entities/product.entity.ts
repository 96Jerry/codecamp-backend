import { Field, ObjectType } from '@nestjs/graphql';
import { Allergy } from 'src/apis/allergies/entities/allergy.entity';
import { ProductDetail } from 'src/apis/productDetails/entities/productDetail.entity';
import { ProductSubCategory } from 'src/apis/productSubCategory/entities/productSubCategory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isDeleted: boolean;

  @Column({ default: null })
  @Field(() => Date)
  deletedAt: Date;

  @ManyToOne(() => ProductSubCategory)
  @Field(() => ProductSubCategory)
  productSubCategory: ProductSubCategory;

  @JoinColumn()
  @OneToOne(() => ProductDetail)
  @Field(() => ProductDetail)
  productDetail: ProductDetail;

  @JoinTable()
  @ManyToMany(() => Allergy, (allergies) => allergies.products)
  @Field(() => [Allergy])
  allergies: Allergy[];
}
