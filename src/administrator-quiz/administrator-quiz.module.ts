import { Module } from '@nestjs/common';
import { AdministratorQuizService } from './administrator-quiz.service';
import { AdministratorQuizController } from './administrator-quiz.controller';
import { AdministratorQuiz } from './entities/administrator-quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorQuiz])],
  controllers: [AdministratorQuizController],
  providers: [AdministratorQuizService],
})
export class AdministratorQuizModule {}
