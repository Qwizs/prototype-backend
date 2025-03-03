import { IsEnum, IsString, Min } from 'class-validator';
import { QuestionType } from '../entities/question.entity';

export class CreateQuestionDto {
  @IsString()
  description: string;

  @IsEnum(QuestionType, {
    message: `Le type doit être l'un des suivants : ${Object.values(QuestionType).join(', ')}`,
  })
  type: QuestionType;

  @Min(1, { message: 'Le temps de réponse ne peut pas être négatif' })
  duration: number;

  @Min(1, { message: 'Le score de réponse ne peut pas être négatif' })
  score: number;
}
