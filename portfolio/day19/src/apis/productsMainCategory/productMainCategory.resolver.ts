import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductMainCategory } from './entities/productMainCategory.entity';
import { ProductMainCategoryService } from './productMainCategory.service';

@Resolver()
export class ProductMainCategoryResolver {
  constructor(
    private readonly productMainCategoryService: ProductMainCategoryService,
  ) {}
  @Mutation(() => ProductMainCategory)
  createProductMainCategory(
    @Args('name') name: string, //
  ) {
    return this.productMainCategoryService.create({ name });
  }
}
