import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allergy } from '../allergies/entities/allergy.entity';
import { Image } from '../images/entities/image.entity';
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
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
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
      imageUrls,
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

    const result3 = await this.productRepository.save({
      ...product, // 이 부분이 관계 id 설정 과정이다.
      productDetail: result, // id 만 넣어줘도 되지만 전체를 넣어줘야 create 함수와 함께 조회 할 때 전체 조회 가능
      productSubCategory: productSubCategory,
      allergies: result2,
    });

    // 저장된 같은 image 가 없으면 image table에 저장
    // 하나의 이미지에는 하나의 상품만 가능
    // 하나의 상품에는 여러개의 이미지 가능
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      // this.productRepository.findOne({where: {}})
      const hasImage = await this.imageRepository.findOne({
        where: { imageAddress: imageUrl },
      });

      // console.log(product);
      // console.log(result3);
      await this.imageRepository.save({
        imageAddress: imageUrl,
        product: result3.id,
      });
    }

    return result3;
  }

  // 수정하고 싶은 url 배열을 담아서 받아오면, image url 을 변경해줘야 한다.

  // 1-1. 상품 id 에 해당하는 모든 image Url 목록 조회

  // 1-2. image table 에서 상품 id 에 해당하는 모든 image url 삭제

  // 1-3. 새로운 image url로 데이터 생성 (모두 삭제했다가 다시 저장하는 로직)

  // or

  // 2-1. 상품 id 에 해당하는 모든 image Url 목록 조회

  // 2-2. image table 에서 상품 id 에 해당하는 모든 image url 조회

  // 2-3. 기존에 없는 이미지면서 클라이언트가 보내준 이미지면 데이터 생성

  // 2-4. 기존에 있지만 클라이언트가 보내주지 않았다면 삭제
  async update({ productId, updateProductInput }) {
    const { imageUrls, ...rest } = updateProductInput;

    const oldImageUrls = await this.imageRepository.find({
      where: { product: { id: productId } },
    });

    for (let i = 0; i < oldImageUrls.length; i++) {
      const oldImageUrlId = oldImageUrls[i].id; // 'asdfew-wef3-2fe'

      await this.imageRepository.delete({ id: oldImageUrlId });
    }
    for (let i = 0; i < imageUrls.length; i++) {
      const newImageUrl = imageUrls[i]; // 'http://2'
      this.imageRepository.save({
        imageAddress: newImageUrl,
        product: productId,
      });
    }
    return await this.productRepository.save({
      id: productId,
      ...rest,
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
