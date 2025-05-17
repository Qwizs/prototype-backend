import { Module } from '@nestjs/common';
import { AdministratorQuizService } from './administrator-quiz.service';
import { AdministratorQuizController } from './administrator-quiz.controller';
import { AdministratorQuiz } from './entities/administrator-quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../quiz/entities/quiz.entity';
import { Administrator } from '../administrators/entities/administrator.entity';
import { AdministratorsService } from '../administrators/administrators.service';
import { QuizService } from '../quiz/quiz.service';
import { AdministratorsController } from '../administrators/administrators.controller';
import { AdministratorsModule } from '../administrators/administrators.module';
import { Category } from '../categories/entities/category.entity';
import { QuizQuestionService } from '../quiz-question/quiz-question.service';
import { QuizQuestion } from '../quiz-question/entities/quiz-question.entity';
import { AnswerQuestionService } from '../answer-question/answer-question.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorQuiz, Administrator, Quiz, Category, QuizQuestion]), Administrator, Quiz, AdministratorsModule],
  controllers: [AdministratorQuizController, AdministratorsController],
  providers: [AdministratorQuizService, AdministratorsService, QuizService, QuizQuestionService],
  exports: [AdministratorQuizService]
})
export class AdministratorQuizModule {}
