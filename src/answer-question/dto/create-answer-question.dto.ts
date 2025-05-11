import { IsBoolean, IsNumber } from "class-validator";
import { PrimaryColumn } from "typeorm";

export class CreateAnswerQuestionDto {
  @PrimaryColumn()
  idQuestion: number;

  @PrimaryColumn()
  idAnswer: number;
    
  @IsBoolean()
  state: boolean;

  @IsNumber()
  order: number;    
}
