import { Module } from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';
import { AnswerQuestionController } from './answer-question.controller';

@Module({
  controllers: [AnswerQuestionController],
  providers: [AnswerQuestionService],
})
export class AnswerQuestionModule {}
