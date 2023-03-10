import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allergy } from '../allergies/entities/allergy.entity';
import { ProductDetail } from '../productDetails/entities/productDetail.entity';
import { ProductMainCategory } from '../productsMainCategory/entities/productMainCategory.entity';
import { ProductSubCategory } from '../productSubCategory/entities/productSubCategory.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    @InjectRepository(Allergy)
    private readonly allergyRepository: Repository<Allergy>,
    @InjectRepository(ProductMainCategory)
    private readonly productMainCategoryRepository: Repository<ProductMainCategory>,
    @InjectRepository(ProductSubCategory)
    private readonly productSubCategoryRepository: Repository<ProductSubCategory>,
  ) {}
  async findAll() {
    return await this.productRepository.find({
      relations: ['productSubCategory', 'allergies', 'productDetail'], // 어떤걸 join 해서 가져올지 정해주는 것
    });
  }
  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSubCategory', 'allergies', 'productDetail'], // productMainCategory는 product entity에 없기때문에 조회하지 않는다.
    });
  }

  async create({ createProductInput }) {
    const {
      productDetail,
      productSubCategoryId,
      productMainCategoryId,
      allergies,
      ...product
    } = createProductInput;
    const result = await this.productDetailRepository.save({
      ...productDetail,
    });

    const productMainCategory =
      await this.productMainCategoryRepository.findOne({
        where: { id: productMainCategoryId },
      });

    const productSubCategory = await this.productSubCategoryRepository.save({
      productMainCategory: productMainCategory,
      id: productSubCategoryId,
    });

    // allergies // ['대두', '밀', '우유']
    const result2 = [];
    for (let i = 0; i < allergies.length; i++) {
      const allergyname = allergies[i];

      const prevAllergy = await this.allergyRepository.findOneBy({
        name: allergyname,
      });
      if (prevAllergy) result2.push(prevAllergy);
      else {
        const newAllergy = await this.allergyRepository.save({
          name: allergyname,
        });
        result2.push(newAllergy);
      }
    }

    return await this.productRepository.save({
      ...product, // 이 부분이 관계 id 설정 과정이다.
      productDetail: result, // id 만 넣어줘도 되지만 전체를 넣어줘야 create 함수와 함께 조회 할 때 전체 조회 가능
      productSubCategory: productSubCategory,
      allergies: result2,
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

  async findAllWithDeleted() {
    return await this.productRepository.find({ withDeleted: true });
  }

  async restore({ productId }) {
    const result = await this.productRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
