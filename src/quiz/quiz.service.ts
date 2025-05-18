import { Injectable, NotFoundException } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Category } from '../categories/entities/category.entity';
import { QuizQuestionService } from 'src/quiz-question/quiz-question.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly quizQuestionService: QuizQuestionService,
  ) {}

  @ApiCreatedResponse({
    description: 'The quiz have been successfully found.',
  })
  public async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  @ApiCreatedResponse({
    description: 'The quiz has been successfully found.',
  })
  public async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({ idQuiz: id });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return quiz;
  }

  public async findQuizsAdmin(id: number): Promise<Quiz[]> {
    const quiz = await this.quizRepository.find({
      where: { idAdministrator: Equal(id) },
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return quiz;
  }

  @ApiCreatedResponse({
    description: 'The quiz has been successfully created.',
  })
  public async create(
    name: string,
    idCategory: number,
    idAdministrator: number,
  ): Promise<Quiz> {
    const category = await this.categoryRepository.findOneBy({
      idCategory: idCategory,
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${idCategory} not found`);
    }

    const newQuiz = this.quizRepository.create({
      idCategory: idCategory,
      name: name,
      idAdministrator: idAdministrator,
    });

    return this.quizRepository.save(newQuiz);
  }

  @ApiCreatedResponse({
    description: 'The quiz has been successfully updated.',
  })
  public async update(
    id: number,
    name?: string,
    idCategory?: number,
  ): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({ idQuiz: id });

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    if (name !== undefined) {
      quiz.name = name;
    }

    if (typeof idCategory === 'number' && !isNaN(idCategory)) {
      const category = await this.categoryRepository.findOneBy({
        idCategory: idCategory,
      });
      if (!category) {
        throw new NotFoundException(`Category with id ${idCategory} not found`);
      }
      quiz.idCategory = idCategory;
    }

    return this.quizRepository.save(quiz);
  }

  @ApiCreatedResponse({
    description: 'The quiz has been successfully removed.',
  })
  public async remove(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({ idQuiz: id });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    await this.quizQuestionService.removeByIdQuiz(id);
    await this.quizRepository.delete({ idQuiz: id });
    // Retourner le quiz supprimé
    return quiz;
  }

  @ApiCreatedResponse({
    description: 'The quizzes have been successfully removed.',
  })
  public async removeAll(): Promise<Quiz[]> {
    const quizzes = await this.quizRepository.find();

    if (quizzes.length === 0) {
      throw new NotFoundException(`Quiz list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.quizRepository.query(
      `TRUNCATE TABLE quiz RESTART IDENTITY CASCADE;`,
    );

    // Retourner les quiz supprimés
    return quizzes;
  }
}
