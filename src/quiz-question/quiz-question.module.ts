import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizQuestion])],
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService],
  exports: [QuizQuestionService],
})
export class QuizQuestionModule {}
