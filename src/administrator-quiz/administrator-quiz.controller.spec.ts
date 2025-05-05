import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorQuizController } from './administrator-quiz.controller';
import { AdministratorQuizService } from './administrator-quiz.service';

describe('AdministratorQuizController', () => {
  let controller: AdministratorQuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministratorQuizController],
      providers: [AdministratorQuizService],
    }).compile();

    controller = module.get<AdministratorQuizController>(AdministratorQuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
