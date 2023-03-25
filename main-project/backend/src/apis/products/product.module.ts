import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergy } from '../allergies/entities/allergy.entity';
import { Image } from '../images/entities/image.entity';
import { ProductDetail } from '../productDetails/entities/productDetail.entity';
import { ProductMainCategory } from '../productsMainCategory/entities/productMainCategory.entity';
import { ProductSubCategory } from '../productSubCategory/entities/productSubCategory.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
    TypeOrmModule.forFeature([
      Product,
      ProductDetail,
      Allergy,
      ProductMainCategory,
      ProductSubCategory,
      Image,
    ]), //
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
