import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerQuestionDto } from './dto/create-answer-question.dto';
import { UpdateAnswerQuestionDto } from './dto/update-answer-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AnswerQuestion } from './entities/answer-question.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { AnswersService } from 'src/answers/answers.service';

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

  async findOne(idQuestion: number, idAnswer: number): Promise<AnswerQuestion> {
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

  async findAnswer(idQuestion: number): Promise<Answer[]> {
    
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
  ): Promise<AnswerQuestion> {
    await this.answerQuestionRepository.update(
      { idQuestion, idAnswer },
      updateAnswerQuestionDto,
    );
    return await this.findOne(idQuestion, idAnswer);
  }

  async remove(idQuestion: number, idAnswer: number): Promise<void> {
    await this.answerQuestionRepository.delete({ idQuestion, idAnswer });
  }
}
