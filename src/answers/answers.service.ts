import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AnswerQuestionService } from 'src/answer-question/answer-question.service';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private repository: Repository<Answer>,
    @Inject(forwardRef(() => AnswerQuestionService))
    private readonly answerQuestionService: AnswerQuestionService,
    @Inject(forwardRef(() => QuestionsService))
    private readonly questionService: QuestionsService,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const newAnswer = await this.repository.save({
      value: createAnswerDto.value,
    });
    const currentQuestion = await this.questionService.findOne(
      createAnswerDto.idQuestion,
    );

    const answersFromQuestion =
      await this.answerQuestionService.findAnswersFromQuestion(
        createAnswerDto.idQuestion,
      );

    if (
      currentQuestion.type === 'simpleChoice' &&
      createAnswerDto.state === true
    ) {
      answersFromQuestion.forEach(async (element) => {
        const answer = await this.answerQuestionService.findOne(
          currentQuestion.idQuestion,
          element.idAnswer,
        );
        await this.answerQuestionService.update(
          answer.idQuestion,
          answer.idAnswer,
          { ...answer, state: false },
        );
      });
    }

    await this.answerQuestionService.create({
      idQuestion: createAnswerDto.idQuestion,
      idAnswer: newAnswer.idAnswer,
      state: createAnswerDto.state,
      order: createAnswerDto.order,
    });
    return null;
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

  async remove(id: number): Promise<boolean> {
    this.answerQuestionService.removeAllWithIdAnswer(id);
    return this.repository
      .delete(id)
      .then((response) => response.affected === 1);
  }
}
