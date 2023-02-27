import { Query, Resolver } from '@nestjs/graphql';
import { CreateStarbucksService } from './createStarbucks.service';

@Resolver()
export class CreateStarbucksResolver {
  constructor(
    private readonly createStarbucksService: CreateStarbucksService,
  ) {}

  @Query(() => String)
  getHello() {
    return this.createStarbucksService.aaa();
  }
}
