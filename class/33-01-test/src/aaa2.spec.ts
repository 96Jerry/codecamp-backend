import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
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
