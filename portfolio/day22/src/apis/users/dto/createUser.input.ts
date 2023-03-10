import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String) // 입력은 받아야 한다. 읽지만 못하게 User entity 에서 빼준다.
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;
}
