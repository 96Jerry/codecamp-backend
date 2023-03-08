import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetail } from '../productDetails/entities/productDetail.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
  ) {}
  async findAll() {
    return await this.productRepository.find({
      relations: ['productSubCategory', 'allergies', 'productDetail'],
    });
  }
  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSubCategory', 'allergies', 'productDetail'],
    });
  }

  async create({ createProductInput }) {
    const { productDetail, productSubCategoryId, ...product } =
      createProductInput;
    return await this.productDetailRepository.save({ ...productDetail });
  }

  async update({ productId, updateProductInput }) {
    return await this.productRepository.save({
      id: productId,
      ...updateProductInput,
    });
  }
}
