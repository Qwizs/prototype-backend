import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number): Promise<Answer | null> {
    return this.repository.findOne({ where: { idAnswer: Equal(id) } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer | null> {
    const newAnswer = await this.findOne(id);
    if (!newAnswer) {
      throw new NotFoundException(`Answer with id ${id} not found`);
      // Option 2 : ou simplement retourner null
      // return null;
    }

    if (updateAnswerDto.value !== undefined) {
      newAnswer.value = updateAnswerDto.value;
    }

    return this.repository.save(newAnswer);
  }


  remove(id: number): Promise<boolean> {
    return this.repository
      .delete(id)
      .then((response) => response.affected === 1);
  }

  public async removeAll(): Promise<Answer[]> {

    const answers = await this.repository.find();
    
    if (answers.length === 0) {
      throw new NotFoundException(`Answer list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.repository.query(
      `TRUNCATE TABLE answer RESTART IDENTITY CASCADE;`
    );    
    
    // Retourner la réponse supprimée
    return answers;
  }  
}
