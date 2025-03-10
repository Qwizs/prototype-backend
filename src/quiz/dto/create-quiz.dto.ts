import { IsString, Min, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuizDto {
    
    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description: 'The name of the quiz',
        example: "Quiz 1",
        type: String,
    })
    name: string;
}
