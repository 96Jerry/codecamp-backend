import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergy } from '../allergies/entities/allergy.entity';
import { ProductDetail } from '../productDetails/entities/productDetail.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductDetail, Allergy]), //
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
