import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  value: string;

  @IsInt()
  idQuestion: number;

  @IsBoolean()
  state: boolean;

  @IsOptional()
  @IsInt()
  order?: number | null;
}
