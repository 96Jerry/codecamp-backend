import { Query, Resolver } from '@nestjs/graphql';
import { createStarbucksService } from './createStarbucks.service';

@Resolver()
export class createStarbucksResolver {
  constructor(
    private readonly createStarbucksService: createStarbucksService,
  ) {}

  @Query()
  getHello() {
    return this.createStarbucksService.aaa;
  }
}
