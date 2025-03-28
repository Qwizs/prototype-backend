import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { QuestionsModule } from './questions/questions.module';
import { CategoriesModule } from './categories/categories.module';
import { Media } from './medias/entities/media.entity';
import { MediasModule } from './medias/medias.module';

@Module({
  imports: [
    DemoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'qwizs',
      username: 'qwizs',
      database: 'qwizs_db',
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    QuestionsModule,
    AnswersModule,
    CategoriesModule,
    MediasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
