import { IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  value: string;
}
