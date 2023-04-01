import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello() {
    return 'Hello World!';
  }
}

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService, // 나만의 appservice
        },
      ],
    }).compile();

    appController = appModule.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 hello world를 리턴', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  });

  describe('fetchBoards', () => {
    appController;
  });
});
