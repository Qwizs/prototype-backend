import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';
import { CreateAnswerQuestionDto } from './dto/create-answer-question.dto';
import { UpdateAnswerQuestionDto } from './dto/update-answer-question.dto';

@Controller('answer-question')
export class AnswerQuestionController {
  constructor(private readonly answerQuestionService: AnswerQuestionService) {}

  @Get('all')
  findAll() {
    return this.answerQuestionService.findAll();
  }

  @Get(':idQuestion/:idAnswer')
  findOne(
    @Param('idQuestion') idQuestion: string,
    @Param('idAnswer') idAnswer: string,
  ) {
    return this.answerQuestionService.findOne(+idQuestion, +idAnswer);
  }

  @Get(':idQuestion/')
  findOneByQuestion(@Param('idQuestion') idQuestion: number) {
    return this.answerQuestionService.findOneByQuestion(+idQuestion);
  }

  @Post()
  create(@Body() createAnswerQuestionDto: CreateAnswerQuestionDto) {
    return this.answerQuestionService.create(createAnswerQuestionDto);
  }

  @Patch(':idQuestion/:idAnswer')
  update(
    @Param('idQuestion') idQuestion: string,
    @Param('idAnswer') idAnswer: string,
    @Body() updateAnswerQuestionDto: UpdateAnswerQuestionDto,
  ) {
    return this.answerQuestionService.update(
      +idQuestion,
      +idAnswer,
      updateAnswerQuestionDto,
    );
  }

  @Delete(':idQuestion/:idAnswer')
  remove(
    @Param('idQuestion') idQuestion: string,
    @Param('idAnswer') idAnswer: string,
  ) {
    return this.answerQuestionService.remove(+idQuestion, +idAnswer);
  }

  @Delete('all')
  removeAll() {
    return this.answerQuestionService.removeAll();
  }   

  @Delete('1/1/:idQuestion')
  removeAllByQuestion(@Param('idQuestion') idQ: number) {
    return this.answerQuestionService.removeAllByQuestion(+idQ);
  }  
}
