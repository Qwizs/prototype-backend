import { IsString, Min, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {

    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description: 'The name of the category',
        example: "Histoire",
        type: String,
    })
    name: string;
}
