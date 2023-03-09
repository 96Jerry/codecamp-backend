import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMainCategory } from '../productsMainCategory/entities/productMainCategory.entity';
import { ProductSubCategory } from './entities/productSubCategory.entity';
import { ProductSubCategoryResolver } from './productSubCategory.resolver';
import { ProductSubCategoryService } from './productSubCategory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductSubCategory, ProductMainCategory]), //
  ],
  providers: [ProductSubCategoryResolver, ProductSubCategoryService],
})
export class ProductSubCategoryModule {}
