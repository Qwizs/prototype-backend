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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'simform',
      username: 'postgres',
      entities: [Administrator, Quiz, Category],
      database: 'database',
      synchronize: true,
      logging: true,
    }),
    DemoModule, 
    AdministratorsModule, QuizModule, CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
