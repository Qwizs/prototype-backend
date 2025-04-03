import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
  ) {}

  @ApiCreatedResponse({
    description: 'The quiz have been successfully found.'
  })
  public async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  @ApiCreatedResponse({
    description: 'The quiz has been successfully found.'
  })
  public async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({idQuiz: id});
    if (!quiz) {
        throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return quiz;
  }

  @ApiCreatedResponse({
    description: 'The quiz has been successfully created.'
  })  
  public async create(name: string): Promise<Quiz> {
    // Créer une nouvelle entité quiz
    const newQuiz = this.quizRepository.create({
      name
    });        

    return this.quizRepository.save(newQuiz);
  }  

  @ApiCreatedResponse({
    description: 'The quiz has been successfully updated.'
  })  
  public async update(id: number, name?: string): Promise<Quiz> {
    // On recherche le quiz par ID
    const quiz = await this.quizRepository.findOneBy({idQuiz: id});

    // Si le quiz n'est pas trouvé, on lève une exception
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    // Mise à jour des champs uniquement si des valeurs sont fournies
    if (name !== undefined) {
      quiz.name = name;
    }

    // Retourner le quiz mis à jour
    return this.quizRepository.save(quiz);
  }

  @ApiCreatedResponse({
    description: 'The quiz has been successfully removed.'
  })
  public async remove(id: number): Promise<Quiz> {
    // Récupérer le quiz avant suppression
    const quiz = await this.quizRepository.findOneBy({idQuiz: id});
    if (!quiz) {
        throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    // Supprimer le quiz
    await this.quizRepository.delete({idQuiz: id});

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.quizRepository.query(
      `SELECT setval(pg_get_serial_sequence('quiz', 'idQuiz'), 1, false)`
    );    

    // Retourner le quiz supprimé
    return quiz;
  }

  @ApiCreatedResponse({
    description: 'The quizzes have been successfully removed.'
  })
  public async removeAll(): Promise<Quiz[]> {

    const quizzes = await this.quizRepository.find();
    
    if (quizzes.length === 0) {
      throw new NotFoundException(`Quiz list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.quizRepository.query(
      `TRUNCATE TABLE quiz RESTART IDENTITY CASCADE;`
    );    
    
    // Retourner les quiz supprimés
    return quizzes;
  }  

}
