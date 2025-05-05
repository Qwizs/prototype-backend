import { IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministratorQuizDto } from './create-administrator-quiz.dto';

export class UpdateAdministratorQuizDto extends PartialType(CreateAdministratorQuizDto) {
    @IsNumber()
    @ApiProperty({
        description: 'The id of the administrator',
        example: 1,
        type: Number,
    })
    idAdministrator?: number;

    @IsNumber()
    @ApiProperty({
        description: 'The id of the quiz',
        example: 1,
        type: Number,
    })
    idQuiz?: number;
}
