import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  //카테고리를 DB에 저장
  async create({ createProductInput }) {
    const result = await this.productRepository.save({
      ...createProductInput,

      // 하나하나 직접 나열하는 방식
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    return result;
  }
  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...myproduct,
      id: productId,
      ...updateProductInput,
    };

    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout){
    //   throw new HttpException("이미 판매완료된 상품입니다.", HttpStatus.UNPROCESSABLE_ENTITY)
    // }
  }

  async delete({ productId }) {
    // //1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // //2. 소프트 삭제(직접 구현) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });
    // // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // // 4. 소프트 삭제(TypeORM 제공)
    // this.productRepository.softRemove({id: productId}) // 아아디로만 삭제가능

    // 5. 소프트 삭제(TypeORM 제공)
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
