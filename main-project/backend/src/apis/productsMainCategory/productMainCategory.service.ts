import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductMainCategory } from './entities/productMainCategory.entity';

@Injectable()
export class ProductMainCategoryService {
  constructor(
    @InjectRepository(ProductMainCategory)
    private readonly productMainCategoryRepository: Repository<ProductMainCategory>,
  ) {}
  async create({ name }) {
    return await this.productMainCategoryRepository.save({ name });
  }
}
