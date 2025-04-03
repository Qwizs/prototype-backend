import { IsString, Min, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdministratorDto {
    
    @IsString()
    @MaxLength(30)
    @ApiProperty({
        description: 'The username of the administrator',
        example: "John",
        type: String,
    })
    username: string;

    @IsString()
    // @MinLength(8)
    @MaxLength(50)
    @ApiProperty({
        description: 'The password of the administrator',
        example: "mdpJ",
        type: String,
    })
    password: string;
}
