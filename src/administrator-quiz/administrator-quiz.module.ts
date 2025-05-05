import { Module } from '@nestjs/common';
import { AdministratorQuizService } from './administrator-quiz.service';
import { AdministratorQuizController } from './administrator-quiz.controller';
import { AdministratorQuiz } from './entities/administrator-quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Administrator } from 'src/administrators/entities/administrator.entity';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { QuizService } from 'src/quiz/quiz.service';
import { AdministratorsController } from 'src/administrators/administrators.controller';
import { AdministratorsModule } from 'src/administrators/administrators.module';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorQuiz, Administrator, Quiz, Category]), Administrator, Quiz, AdministratorsModule],
  controllers: [AdministratorQuizController, AdministratorsController],
  providers: [AdministratorQuizService, AdministratorsService, QuizService],
})
export class AdministratorQuizModule {}
