import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { QuizQuestion } from './entities/quiz-question.entity';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Get('all')
  findAll() {
    return this.quizQuestionService.findAll();
  }

  @Get(':idQuiz/questions')
  findByQuiz(@Param('idQuiz') idQuiz: number): Promise<QuizQuestion[]> {
    return this.quizQuestionService.findByQuiz(+idQuiz);
  }

  @Get(':idQuiz/:idQuestion')
  findOne(
    @Param('idQuiz') idQuiz: string,
    @Param('idQuestion') idQuestion: string,
  ) {
    return this.quizQuestionService.findOne(+idQuiz, +idQuestion);
  }

  @Post()
  create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionService.create(createQuizQuestionDto);
  }

  @Patch(':idQuiz/:idQuestion')
  update(
    @Param('idQuiz') idQuiz: string,
    @Param('idQuestion') idQuestion: string,
    @Body() data: { order: number },
  ) {
    return this.quizQuestionService.update(+idQuiz, +idQuestion, data);
  }

  @Put(':idQuiz/questions-order')
  updateOrders(
    @Param('idQuiz') idQuiz: string,
    @Body() data: { idQuestion: number; order: number }[],
  ) {
    return this.quizQuestionService.updateOrders(+idQuiz, data);
  }

  @Delete(':idQuiz/:idQuestion')
  remove(
    @Param('idQuiz') idQuiz: string,
    @Param('idQuestion') idQuestion: string,
  ) {
    return this.quizQuestionService.remove(+idQuiz, +idQuestion);
  }
}
