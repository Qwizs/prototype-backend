import { Module } from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';
import { AnswerQuestionController } from './answer-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerQuestion } from './entities/answer-question.entity';
import { AnswersModule } from '../answers/answers.module';
import { AnswersService } from '../answers/answers.service';
import { Answer } from '../answers/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerQuestion, Answer]), AnswersModule, AnswerQuestion],
  controllers: [AnswerQuestionController],
  providers: [AnswerQuestionService],
  exports: [AnswerQuestionService]
})
export class AnswerQuestionModule {}
