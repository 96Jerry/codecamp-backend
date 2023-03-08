import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ProductDetailInput } from 'src/apis/productDetails/dto/productDetail.input';
import { Column, Entity } from 'typeorm';
import { CreateProductInput } from './createProduct.input';

@Entity()
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
