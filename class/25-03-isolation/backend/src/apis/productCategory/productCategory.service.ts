import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}
  //카테고리를 DB에 저장
  async create({ name }) {
    const result = await this.productCategoryRepository.save({
      name,
    });
    console.log(result);

    return result;
  }
}
