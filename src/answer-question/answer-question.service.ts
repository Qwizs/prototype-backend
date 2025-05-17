import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerQuestionDto } from './dto/create-answer-question.dto';
import { UpdateAnswerQuestionDto } from './dto/update-answer-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AnswerQuestion } from './entities/answer-question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { AnswersService } from '../answers/answers.service';

@Injectable()
export class AnswerQuestionService {
  constructor(
    @InjectRepository(AnswerQuestion)
    private readonly answerQuestionRepository: Repository<AnswerQuestion>,
    private readonly answerService: AnswersService,
  ) {}

  async findAll(): Promise<AnswerQuestion[]> {
    return await this.answerQuestionRepository.find();
  }

  async findOne(idQuestion: number, idAnswer: number): Promise<AnswerQuestion | null> {
    return await this.answerQuestionRepository.findOne({
      where: { idQuestion, idAnswer },
    });
  }

  async findOneByQuestion(idQuestion: number): Promise<AnswerQuestion[]> {
    const answerQuestion = await this.answerQuestionRepository.findBy({idQuestion: idQuestion});
    if (!answerQuestion) {
        throw new NotFoundException(`QuizQuestion with id ${idQuestion} not found`);
    }
    return answerQuestion;
  }

  async create(
    createAnswerQuestionDto: CreateAnswerQuestionDto,
  ): Promise<AnswerQuestion> {
    const answerQuestion = this.answerQuestionRepository.create(
      createAnswerQuestionDto,
    );
    return await this.answerQuestionRepository.save(answerQuestion);
  }

  async findAnswer(idQuestion: number): Promise<(Answer | null)[]> {
    
    const answersId: AnswerQuestion[] =
      await this.answerQuestionRepository.find({
        where: { idQuestion: Equal(idQuestion) },
      });

    return Promise.all(
      answersId.map(
        async (answerId) => await this.answerService.findOne(answerId.idAnswer),
      ),
    );
  }

  async update(
    idQuestion: number,
    idAnswer: number,
    updateAnswerQuestionDto: UpdateAnswerQuestionDto,
  ): Promise<AnswerQuestion | null> {
    await this.answerQuestionRepository.update(
      { idQuestion, idAnswer },
      updateAnswerQuestionDto,
    );
    return await this.findOne(idQuestion, idAnswer);
  }

  async remove(idQuestion: number, idAnswer: number): Promise<void> {
    await this.answerQuestionRepository.delete({ idQuestion, idAnswer });
  }

  async removeAll(): Promise<AnswerQuestion[]> {

    const answerQuestions = await this.answerQuestionRepository.find();
    console.log(answerQuestions);

    if (answerQuestions.length === 0) {
      throw new NotFoundException(`Answer list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.answerQuestionRepository.query(
      `TRUNCATE TABLE answer_question RESTART IDENTITY CASCADE;`
    );    
    
    // Retourner les réponses supprimées
    return answerQuestions;
  }   

  async removeAllByQuestion(idQ: number): Promise<AnswerQuestion[]> {
    console.log("idQ", idQ);
    
    const answerQuestionService = new AnswerQuestionService(
      this.answerQuestionRepository,
      this.answerService
    );
    
    // Récupérer tous les réponses associées à la question
    const answerQuestion = await answerQuestionService.findOneByQuestion(idQ);
    
    if (answerQuestion.length === 0) {
      throw new NotFoundException(`No answers found for the question with id ${idQ}`);
    }
  
    // Supprimer chaque réponse une par une
    for (const answer of answerQuestion) {
      console.log(answer);
      await this.remove(+idQ, +answer.idAnswer); // Appeler la méthode remove pour chaque réponse
      await this.answerService.remove(+answer.idAnswer);
    }
    
    // Retourner une réponse de succès
    return answerQuestion;
  }  
}
