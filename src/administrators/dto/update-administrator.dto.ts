import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministratorDto } from './create-administrator.dto';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateAdministratorDto extends PartialType(CreateAdministratorDto) {
    @IsOptional()
    @IsString()
    @MaxLength(30)
    username?: string;

    @IsOptional()
    @IsString()
    // @MinLength(8)
    @MaxLength(50)
    password?: string;
}
