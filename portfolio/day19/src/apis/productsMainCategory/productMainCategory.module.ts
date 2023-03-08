import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMainCategory } from './entities/productMainCategory.entity';
import { ProductMainCategoryResolver } from './productMainCategory.resolver';
import { ProductMainCategoryService } from './productMainCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMainCategory])],
  providers: [
    ProductMainCategoryService, //
    ProductMainCategoryResolver,
  ],
})
export class ProductMainCategoryModule {}
