import { Field, InputType } from '@nestjs/graphql';
import { ProductDetailInput } from 'src/apis/productDetails/dto/productDetail.input';
import { Column, Entity } from 'typeorm';

@InputType() // inputType은 entity 데코레이터와 column이 필요하지 않다.
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => ProductDetailInput)
  productDetail: ProductDetailInput;

  @Field(() => String)
  productSubCategoryId: string;
}
