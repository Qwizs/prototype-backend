import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { AdministratorsModule } from './administrators/administrators.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './administrators/entities/administrator.entity';
import { QuizModule } from './quiz/quiz.module';
import { Quiz } from './quiz/entities/quiz.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { MediasModule } from './medias/medias.module';
import { Media } from './medias/entities/media.entity';
import { AdministratorQuizModule } from './administrator-quiz/administrator-quiz.module';
import { AdministratorQuiz } from './administrator-quiz/entities/administrator-quiz.entity';
import { Question } from './questions/entities/question.entity';
import { QuestionsModule } from './questions/questions.module';
import { Answer } from './answers/entities/answer.entity';
import { AnswersModule } from './answers/answers.module';
import { AnswerQuestion } from './answer-question/entities/answer-question.entity';
import { AnswerQuestionModule } from './answer-question/answer-question.module';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';
import { QuizQuestion } from './quiz-question/entities/quiz-question.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'qwizs',
      username: 'qwizs',
      database: 'qwizs_db',
      logging: true,
      synchronize: true,
      entities: [Administrator, Quiz, Category, Media, AdministratorQuiz, Question, AnswerQuestion, Answer, QuizQuestion],
     
    }),
    DemoModule, 
    AdministratorsModule, 
    QuizModule, 
    CategoriesModule, 
    MediasModule, 
    AdministratorQuizModule,
    QuestionsModule,
    AnswersModule,
    AnswerQuestionModule,
    QuizQuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
