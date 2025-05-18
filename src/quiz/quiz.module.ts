import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { CategoriesModule } from '../categories/categories.module';
import { QuizQuestionModule } from 'src/quiz-question/quiz-question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz]),
    CategoriesModule,
    QuizQuestionModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
