import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // elasticsearch 조회연습
    const result = await this.elasticsearchService.search({
      index: 'myproduct03_brandnew',
      query: {
        match_all: {},
      },
    });

    console.log(JSON.stringify(result, null, ' '));

    // elasticsearch에서 조회해보기 위해 주석
    // return this.productService.findAll();
  }

  @Query(() => Product)
  async fetchProduct(@Args('productId') productId: string) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // // elastic search 연습 이후 삭제
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct03',
    //   document: {
    //     // name: "철수",
    //     ...createProductInput,
    //   },
    // });

    // elastic search 등록위해 임시 주석
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료가 됐는지 확인하기
    await this.productService.checkSoldout({ productId });

    // update 하기
    return await this.productService.update({ productId, updateProductInput });
  }
  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId });
  }
}
