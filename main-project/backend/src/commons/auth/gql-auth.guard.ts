import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// userresolver 에서 사용되는 authguard 를 gql 버전으로 바꿔치기 하는 과정
export class GqlAuthAccessGuard extends AuthGuard('access') {
  // 오버라이딩(덮어쓰기)
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req; // gql context 에서 가져온 값에서 req 만 뽑아와줘
  }
}

export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
  // 오버라이딩(덮어쓰기)
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req; // gql context 에서 가져온 값에서 req 만 뽑아와줘
  }
}
