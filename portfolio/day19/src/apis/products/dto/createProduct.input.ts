import { Field, InputType } from '@nestjs/graphql';
import { ProductDetailInput } from 'src/apis/productDetails/dto/productDetail.input';
import { Column, Entity } from 'typeorm';

@Entity()
@InputType()
export class CreateProductInput {
  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  productSubCategoryId: string;

  @Column()
  @Field(() => ProductDetailInput)
  productDetail: ProductDetailInput;
}
