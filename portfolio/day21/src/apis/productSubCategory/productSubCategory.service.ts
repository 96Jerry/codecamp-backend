import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSubCategory } from './entities/productSubCategory.entity';

@Injectable()
export class ProductSubCategoryService {
  constructor(
    @InjectRepository(ProductSubCategory)
    private readonly productSubCategoryRepository: Repository<ProductSubCategory>, //
  ) {}
  async create({ name }) {
    return await this.productSubCategoryRepository.save({
      name,
    });
  }
}
