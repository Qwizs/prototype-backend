import { IsString, MaxLength, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'The name of the quiz',
    example: 'Quiz 1',
    type: String,
  })
  name: string;

  @IsInt()
  @ApiProperty({
    description: 'The id of the category',
    example: '1',
    type: Number,
  })
  idCategory: number;

  @IsInt()
  @ApiProperty({
    description: 'The id of the administrator',
    example: '1',
    type: Number,
  })
  idAdministrator: number;
}
