import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private repository: Repository<Answer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.repository.save(createAnswerDto);
  }

  findAll(): Promise<Answer[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Answer> {
    return this.repository.findOne({ where: { idAnswer: Equal(id) } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const newAnswer: Answer = await this.findOne(id);
    newAnswer.value = updateAnswerDto.value;
    return this.repository.save(newAnswer);
  }

  remove(id: number): Promise<boolean> {
    return this.repository
      .delete(id)
      .then((response) => response.affected === 1);
  }
}
