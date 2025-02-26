import { IsString, Min, MaxLength, MinLength } from 'class-validator';

export class CreateAdministratorDto {
    @IsString()
    @MaxLength(30)
    username: string;

    @IsString()
    // @MinLength(8)
    @MaxLength(50)
    password: string;
}
