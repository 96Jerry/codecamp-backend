import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { ProductDetail } from '../entities/productDetail.entity';

@InputType()
export class ProductDetailInput extends OmitType(
  ProductDetail,
  ['id'],
  InputType,
) {}
