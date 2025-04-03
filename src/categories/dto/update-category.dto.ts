import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description: 'The name of the category',
        example: "Histoire",
        type: String,
    })
    name?: string;
}
