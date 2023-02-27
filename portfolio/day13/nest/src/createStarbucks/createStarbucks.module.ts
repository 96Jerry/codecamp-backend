import { Module } from '@nestjs/common';
import { CreateStarbucksResolver } from './createStarbucks.resolver';
import { CreateStarbucksService } from './createStarbucks.service';

@Module({
  providers: [CreateStarbucksResolver, CreateStarbucksService],
})
export class CreateStarbucksModule {}
