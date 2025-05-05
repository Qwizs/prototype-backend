import { IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdministratorQuizDto {
    @IsNumber()
    @ApiProperty({
        description: 'The id of the administrator',
        example: 1,
        type: Number,
    })
    idAdministrator: number;

    @IsNumber()
    @ApiProperty({
        description: 'The id of the quiz',
        example: 1,
        type: Number,
    })
    idQuiz: number;
}
