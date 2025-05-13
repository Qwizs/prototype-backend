import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepository: Repository<QuizQuestion>
  ){}

  async findAll(): Promise<QuizQuestion[]> {
    return await this.quizQuestionRepository.find();
  }

  async findOne(idQuiz: number, idQuestion: number): Promise<QuizQuestion> {
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

  async update(idQuiz: number, idQuestion: number, updateQuizQuestionDto: UpdateQuizQuestionDto): Promise<QuizQuestion> {
    await this.quizQuestionRepository.update(
      { idQuiz, idQuestion },
      updateQuizQuestionDto
    )

    return await this.findOne(idQuiz, idQuestion);
  }

  async remove(idQuiz: number, idQuestion: number): Promise<void> {
    await this.quizQuestionRepository.delete({ idQuiz, idQuestion });
  }
}
