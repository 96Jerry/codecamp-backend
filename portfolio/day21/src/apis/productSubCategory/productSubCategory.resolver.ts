import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductSubCategory } from './entities/productSubCategory.entity';
import { ProductSubCategoryService } from './productSubCategory.service';

@Resolver()
export class ProductSubCategoryResolver {
  constructor(
    private readonly productSubCategoryService: ProductSubCategoryService, //
  ) {}
  @Mutation(() => ProductSubCategory)
  createProductSubCategory(
    @Args('name') name: string, //
  ) {
    return this.productSubCategoryService.create({ name });
  }
}
