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
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ) {
    console.log(createStarbucksInput);

    return this.createStarbucksService.create();
  }
}
