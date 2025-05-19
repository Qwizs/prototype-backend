import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuizQuestionModule } from 'src/quiz-question/quiz-question.module';
import { AnswerQuestionModule } from 'src/answer-question/answer-question.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    TypeOrmModule.forFeature([Question]),
    QuizQuestionModule,
    AnswerQuestionModule,
  ],
  exports: [QuestionsService],
})
export class QuestionsModule {}
