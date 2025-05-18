import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { Administrator } from './entities/administrator.entity';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports: [TypeOrmModule.forFeature([Administrator]), QuizModule],
  controllers: [AdministratorsController],
  providers: [AdministratorsService],
  exports: [AdministratorsService],
})
export class AdministratorsModule {}
