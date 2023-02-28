import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStarbucksService } from './createStarbucks.service';
import { CreateStarbucksInput } from './dto/createStarbucks.input';
import { Starbucks } from './entities/createStarbucks.entity';

@Resolver()
export class CreateStarbucksResolver {
  constructor(
    private readonly createStarbucksService: CreateStarbucksService,
  ) {}

  // @Query(() => String)
  // getHello() {
  //   return this.createStarbucksService.aaa();
  // }

  @Query(() => [Starbucks])
  fetchCreateStarbucks() {
    return this.createStarbucksService.findAll();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('menu') menu: string,
    @Args('price') price: number,
    @Args('kcal') kcal: number,
    @Args('saturated_fat') saturated_fat: number,
    @Args('protein') protein: number,
    @Args('salt') salt: number,
    @Args('sugar') sugar: number,
    @Args('caffeine') caffeine: number,
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ) {
    console.log(createStarbucksInput);

    return this.createStarbucksService.create();
  }
}
