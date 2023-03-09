import { Field, ObjectType } from '@nestjs/graphql';
import { Allergy } from 'src/apis/allergies/entities/allergy.entity';
import { ProductDetail } from 'src/apis/productDetails/entities/productDetail.entity';
import { ProductSubCategory } from 'src/apis/productSubCategory/entities/productSubCategory.entity';
import {
  Column,
  DeleteDateColumn,
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

  @DeleteDateColumn() // soft delete 를 하기 위해서 필요한 데코레이터이다.
  // @Field(() => Date) // 삭제된 데이터를 불러올 필요가 없으니 field는 필요없다.
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
