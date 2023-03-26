import { Mutation, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation(() => String)
  login() {
    return 'Success login';
  }
}
