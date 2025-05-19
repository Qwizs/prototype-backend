import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizQuestionService } from 'src/quiz-question/quiz-question.service';
import { AnswerQuestionService } from 'src/answer-question/answer-question.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private repository: Repository<Question>,
    private readonly quizQuestionService: QuizQuestionService,
    private readonly answerQuestionService: AnswerQuestionService,
  ) {}

  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.repository.save(createQuestionDto);
  }

  findAll(): Promise<Question[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.repository.findOne({ where: { idQuestion: Equal(id) } });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const newQuestion: Question = await this.findOne(id);
    Object.assign(newQuestion, updateQuestionDto);
    return this.repository.save(newQuestion);
  }

  async remove(id: number): Promise<boolean> {
    this.quizQuestionService.removeByIdQuestion(id);
    this.answerQuestionService.removeAllWithQuestion(id);
    return this.repository
      .delete(id)
      .then((response) => response.affected === 1);
  }
}
