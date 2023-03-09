import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../products/entities/product.entity';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create({ createUserInput });
  }

  // 삭제
  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string) {
    return this.userService.delete({ userId });
  }

  // 조회
  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  fetchUser(
    @Args('productId') productId: string, //
  ) {
    return this.userService.findOne({ productId });
  }
  // 수정
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('userId') userId: string,
  ) {
    return this.userService.update({ userId, updateUserInput });
  }
}
