import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private repository: Repository<Question>,
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

  remove(id: number): Promise<boolean> {
    return this.repository
      .delete(id)
      .then((response) => response.affected === 1);
  }
}
