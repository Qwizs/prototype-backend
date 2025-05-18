import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { AdministratorsModule } from './administrators/administrators.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from './quiz/quiz.module';
import { CategoriesModule } from './categories/categories.module';
import { MediasModule } from './medias/medias.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { AnswerQuestionModule } from './answer-question/answer-question.module';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://qwizs-db_owner:npg_3cIhb2SHQUZJ@ep-twilight-hall-abjibifd-pooler.eu-west-2.aws.neon.tech/qwizs-db?sslmode=require',
      ssl: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    DemoModule,
    AdministratorsModule,
    QuizModule,
    CategoriesModule,
    MediasModule,
    QuestionsModule,
    AnswersModule,
    AnswerQuestionModule,
    QuizQuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
