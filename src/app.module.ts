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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'simform',
      username: 'postgres',
      entities: [Administrator, Quiz, Category, Media, AdministratorQuiz],
      database: 'database',
      synchronize: true,
      logging: true,
    }),
    DemoModule, 
    AdministratorsModule, 
    QuizModule, 
    CategoriesModule, 
    MediasModule, 
    AdministratorQuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
