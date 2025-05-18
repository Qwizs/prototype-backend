import { Module } from '@nestjs/common';
import { DemoGateway } from './demo.gateway';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuizQuestionModule } from 'src/quiz-question/quiz-question.module';
import { AnswersModule } from 'src/answers/answers.module';
import { AnswerQuestionModule } from 'src/answer-question/answer-question.module';

@Module({
  providers: [DemoGateway],
  imports: [QuestionsModule, QuizQuestionModule,AnswerQuestionModule],
})
export class DemoModule {}
