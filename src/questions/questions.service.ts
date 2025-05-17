import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<Question> {
    const question = await this.repository.findOneBy({idQuestion: id});
    if (!question) {
        throw new NotFoundException(`Question with id ${id} not found`);
    }    
    return question;
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

  async removeAll(): Promise<Question[]> {

    const questions = await this.repository.find();
    
    if (questions.length === 0) {
      throw new NotFoundException(`Question list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.repository.query(
      `TRUNCATE TABLE question RESTART IDENTITY CASCADE;`
    );    
    
    // Retourner les questions supprimés
    return questions;
  } 
}
