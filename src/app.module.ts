import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { AdministratorsModule } from './administrators/administrators.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './administrators/entities/administrator.entity';
import { AdministratorQuizModule } from './administrator-quiz/administrator-quiz.module';
import { AdministratorQuiz } from './administrator-quiz/entities/administrator-quiz.entity';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'simform',
      username: 'postgres',
      entities: [Administrator, AdministratorQuiz],
      database: 'database',
      synchronize: true,
      logging: true,
    }),
    DemoModule, 
    AdministratorsModule, AdministratorQuizModule, QuizModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
