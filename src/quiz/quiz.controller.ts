import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('all')
  public async findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Quiz> {
    return this.quizService.findOne(+id);
  }

  @Post()
  public async create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto.name);
  }

  @Put(':id')
  public async update(@Param('id') id: number, @Body() updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    return this.quizService.update(+id, updateQuizDto.name);
  }

  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<Quiz> {
    return this.quizService.remove(+id);
  }

  @Delete()
  public async removeAll(): Promise<Quiz[]> {
    return this.quizService.removeAll();
  }  
}
