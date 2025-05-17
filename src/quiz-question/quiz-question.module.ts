import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { AnswerQuestion } from '../answer-question/entities/answer-question.entity';
import { AnswerQuestionModule } from '../answer-question/answer-question.module';
import { Answer } from '../answers/entities/answer.entity';
import { AnswerQuestionService } from '../answer-question/answer-question.service';
import { AnswerQuestionController } from '../answer-question/answer-question.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizQuestion, AnswerQuestion, Answer]),
    AnswerQuestionModule, AnswerQuestion, Answer
  ],
  controllers: [QuizQuestionController, AnswerQuestionController],
  providers: [QuizQuestionService],
  exports: [QuizQuestionService]
})
export class QuizQuestionModule {}

