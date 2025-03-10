import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorQuizService } from './administrator-quiz.service';

describe('AdministratorQuizService', () => {
  let service: AdministratorQuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministratorQuizService],
    }).compile();

    service = module.get<AdministratorQuizService>(AdministratorQuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
