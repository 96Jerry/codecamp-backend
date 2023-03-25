import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
    private readonly elasticService: ElasticsearchService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  @Query(() => String)
  async fetchProducts(
    @Args('search') search: string, //
  ) {
    // 1. redis에 검색어에 대한 결과가 캐싱되어있는지 확인후 있다면 클라이언트에 반환하기
    const hasResult = await this.cacheManager.get(`${search}`);

    // // console.log(JSON.stringify(elasticResult.hits.hits, null, ' ')); // elasticResult.hits.hits 는 배열이다.

    // await this.cacheManager.set(`${search}`, elasticNameResult, { ttl: 120 });

    // console.log(hasResult);
    // const aaa = await this.cacheManager.get(`${search}`);
    // console.log(JSON.stringify(aaa, null, ' '));
    if (hasResult) {
      return hasResult;
    }
    // 2. 없다면 elasticsearch에서 해당 검색어를 match query를 이용해 상품이름에서 검색후, 검색결과를 redis에 저장한다. 또한 결과를 클라이언트에 반환하기
    // 하나만 있다고 가정하고 만들고 나중에 여러개가 있을 때로 수정해준다!!!
    else {
      const elasticResult: any = await this.elasticService.search({
        index: 'myproduct04',
        query: {
          // match: { name: `${search}` },
          match_all: {},
        },
      });
      const elasticNameResult = elasticResult.hits.hits[0]._source.name;
      await this.cacheManager.set(`${search}`, elasticNameResult, { ttl: 120 });

      const result = await this.cacheManager.get(`${search}`);
      return result;

      // 조회 연습을 위해 주석처리
      // return this.productService.findAll();
    }
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }

  // 삭제한 상품도 조회하는 API
  @Query(() => [Product])
  fetchProductsWithDeleted() {
    return this.productService.findAllWithDeleted();
  }

  // 삭제한 상품을 다시 보이게 만드는 API
  @Mutation(() => Boolean)
  restoreProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.restore({ productId });
  }
}
