import { forwardRef, Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerQuestionModule } from 'src/answer-question/answer-question.module';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
    TypeOrmModule.forFeature([Answer]),
    forwardRef(() => AnswerQuestionModule),
    forwardRef(() => QuestionsModule),
  ],
  exports: [AnswersService],
})
export class AnswersModule {}
