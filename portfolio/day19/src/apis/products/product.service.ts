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
      relations: ['productSubCategory', 'allergies', 'productDetail'], // 어떤걸 join 해서 가져올지 정해주는 것
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
    const result = await this.productDetailRepository.save({
      ...productDetail,
    });
    return await this.productRepository.save({
      ...product, // 이 부분이 관계 id 설정 과정이다.
      productDetail: result, // id 만 넣어줘도 되지만 전체를 넣어줘야 조회 할 때 전체 조회 가능
      productSubCategory: { id: productSubCategoryId },
    });
  }

  async update({ productId, updateProductInput }) {
    return await this.productRepository.save({
      id: productId,
      ...updateProductInput,
    });
  }

  async delete({ productId }) {
    // // 1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // // 2. soft 삭제(직접구현)
    // this.productRepository.update({ id: productId }, { isDeleted: true });
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // // 3. soft 삭제(typeorm 제공)
    // this.productRepository.softRemove({id: productId}) // id로만
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
