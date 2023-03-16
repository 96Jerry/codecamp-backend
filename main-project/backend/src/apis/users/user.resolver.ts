import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bycrpt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    const hashedPassword = await bycrpt.hash(createUserInput.password, 10);
    createUserInput.password = hashedPassword;
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

  // 로그인 했을 때만 조회 가능하게 해주는 방법
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchloginUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return await this.userService.findOnewithId({ userId: currentUser.id });
  }
  // 수정
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('userId') userId: string,
  ) {
    return this.userService.update({ userId, updateUserInput });
  }

  // 로그인한 user의 비밀번호를 변경
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  updateUserPwd(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('changePwd') changePwd: string,
  ) {
    const userId = currentUser.id;
    return this.userService.updateloginPwd({ userId, changePwd });
  }

  // 로그인한 user 한 사람을 삭제
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLoginUser(
    @CurrentUser('currentUser') currentUser: any, //
  ) {
    const userId = currentUser.id;
    return this.userService.delete({ userId });
  }
}
