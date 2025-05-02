import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-quiz.dto';
import { IsOptional, IsString, MinLength, MaxLength, IsInt } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description: 'The name of the quiz',
        example: "Quiz 1",
        type: String,
    })
    name: string;

    @IsOptional()
    @IsInt()
    @ApiProperty({
        description: 'The id of the category',
        example: "1",
        type: Number,
    })
    idCategory: number;
}
