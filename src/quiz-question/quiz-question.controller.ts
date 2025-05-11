import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Get('all')
  findAll() {
    return this.quizQuestionService.findAll();
  }

  @Get(':idQuiz/:idQuestion')
  findOne(@Param('idQuiz') idQuiz: string, @Param('idQuestion') idQuestion: string) {
    return this.quizQuestionService.findOne(+idQuiz, +idQuestion);
  }

  @Post()
  create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionService.create(createQuizQuestionDto);
  }

  @Patch(':idQuiz/:idQuestion')
  update(@Param('idQuiz') idQuiz: string, @Param('idQuestion') idQuestion: string, @Body() updateQuizQuestionDto: UpdateQuizQuestionDto) {
    return this.quizQuestionService.update(+idQuiz, +idQuestion, updateQuizQuestionDto);
  }

  @Delete(':idQuiz/:idQuestion')
  remove(@Param('idQuiz') idQuiz: string, @Param('idQuestion') idQuestion: string) {
    return this.quizQuestionService.remove(+idQuiz, +idQuestion);
  }
}
