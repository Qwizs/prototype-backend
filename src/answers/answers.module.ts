import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswersModule {}
