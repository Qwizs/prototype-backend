import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministratorDto } from './create-administrator.dto';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdministratorDto extends PartialType(CreateAdministratorDto) {
    @IsOptional()
    @IsString()
    @MaxLength(30)
    @ApiProperty({
        description: 'The username of the administrator',
        example: "John",
        type: String,
    })
    username?: string;

    @IsOptional()
    @IsString()
    // @MinLength(8)
    @MaxLength(50)
    @ApiProperty({
        description: 'The password of the administrator',
        example: "mdpJ",
        type: String,
    })
    password?: string;
}
