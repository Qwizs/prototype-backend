import { IsNumber } from "class-validator";
import { PrimaryColumn } from "typeorm";

export class CreateQuizQuestionDto {
  @PrimaryColumn()
  idQuiz: number;

  @PrimaryColumn()
  idQuestion: number;

  @IsNumber()
  order: number;     
}
