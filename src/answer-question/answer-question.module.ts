import { Module } from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';
import { AnswerQuestionController } from './answer-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerQuestion } from './entities/answer-question.entity';
import { AnswersModule } from 'src/answers/answers.module';
import { Question } from 'src/questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerQuestion]), AnswersModule],
  controllers: [AnswerQuestionController],
  providers: [AnswerQuestionService],
  exports: [AnswerQuestionService],
})
export class AnswerQuestionModule {}
