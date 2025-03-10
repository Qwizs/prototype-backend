import { PartialType } from '@nestjs/swagger';
import { CreateAdministratorQuizDto } from './create-administrator-quiz.dto';

export class UpdateAdministratorQuizDto extends PartialType(CreateAdministratorQuizDto) {}
