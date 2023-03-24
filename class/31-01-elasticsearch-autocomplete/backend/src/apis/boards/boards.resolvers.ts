import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/boards.entity';
import { Cache } from 'cache-manager';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => String)
  // getHello() {
  //   return this.boardService.aaa();
  // }
  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }
  @Mutation(() => String)
  async createBoard(
    @Args({ name: 'writer', nullable: true }) writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, {
      // ttl: 0, // 쓰지 않으면 기본 5초
    });
    // 2. 캐시에서 조회하는 연습
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    return '캐시 테스트중';
    // console.log(writer);
    // console.log(title);
    // console.log(contents);
    // console.log(createBoardInput);
    // return this.boardService.create();
  }
}
