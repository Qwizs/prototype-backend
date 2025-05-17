import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { AnswerQuestionService } from '../answer-question/answer-question.service';
import { Repository } from 'typeorm';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepository: Repository<QuizQuestion>,
    // private readonly answerQuestionService: AnswerQuestionService
  ){}

  async findAll(): Promise<QuizQuestion[]> {
    return await this.quizQuestionRepository.find();
  }

  async findOne(idQuiz: number, idQuestion: number): Promise<QuizQuestion | null> {
    return await this.quizQuestionRepository.findOne({
      where: { idQuiz, idQuestion },
    });
  }

  async findOneByQuiz(idQuiz: number): Promise<QuizQuestion[]> {
    const quizQuestion = await this.quizQuestionRepository.findBy({idQuiz: idQuiz});
    if (!quizQuestion) {
        throw new NotFoundException(`QuizQuestion with id ${idQuiz} not found`);
    }
    return quizQuestion;
  }

  async create(createQuizQuestionDto: CreateQuizQuestionDto): Promise<QuizQuestion> {
    const quizQuestion = this.quizQuestionRepository.create(
      createQuizQuestionDto,
    )
    return await this.quizQuestionRepository.save(quizQuestion);
  }

  async update(idQuiz: number, idQuestion: number, updateQuizQuestionDto: UpdateQuizQuestionDto): Promise<QuizQuestion | null> {
    await this.quizQuestionRepository.update(
      { idQuiz, idQuestion },
      updateQuizQuestionDto
    )

    return await this.findOne(idQuiz, idQuestion);
  }

  async remove(idQuiz: number, idQuestion: number): Promise<void> {
    await this.quizQuestionRepository.delete({ idQuiz, idQuestion });
  }

  async removeByQuiz(idQuiz: number): Promise<void> {
    await this.quizQuestionRepository.delete({ idQuiz });
  }

  async removeAll(): Promise<QuizQuestion[]> {

    const quizQuestions = await this.quizQuestionRepository.find();
    
    if (quizQuestions.length === 0) {
      throw new NotFoundException(`quizQuestions list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.quizQuestionRepository.query(
      `TRUNCATE TABLE quiz_question RESTART IDENTITY CASCADE;`
    );    
    
    // Retourner les questions supprimés
    return quizQuestions;
  }   

  async removeAllByQuiz(idQ: number): Promise<QuizQuestion[]> {
    console.log("idQ", idQ);
    
    // const quizQuestionService = new QuizQuestionService(
    //   this.quizQuestionRepository,
    //   this.answerQuestionService
    // );
    
    // Récupérer tous les questions associés à au quiz
    const quizQuestion = await this.quizQuestionRepository.findBy({idQuiz: idQ});
    if (!quizQuestion) {
        throw new NotFoundException(`QuizQuestion with id ${idQ} not found`);
    }
    
    if (quizQuestion.length === 0) {
      throw new NotFoundException(`No quizquestion found for the quiz with id ${idQ}`);
    }
  
    // Supprimer chaque quiz un par un
    for (const question of quizQuestion) {
      console.log(question);
      // await this.answerQuestionService.removeAllByQuestion(+question.idQuestion);
      await this.quizQuestionRepository.delete({ idQuiz: idQ });
    }
    
    // Retourner une réponse de succès
    return quizQuestion;
  }  
}
