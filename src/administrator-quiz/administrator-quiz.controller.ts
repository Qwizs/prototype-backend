import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AdministratorQuizService } from './administrator-quiz.service';
import { CreateAdministratorQuizDto } from './dto/create-administrator-quiz.dto';
import { UpdateAdministratorQuizDto } from './dto/update-administrator-quiz.dto';

@Controller('administrator-quiz')
export class AdministratorQuizController {
  constructor(private readonly administratorQuizService: AdministratorQuizService) {}

  @Get()
  findAll() {
    return this.administratorQuizService.getAll();
  }

  @Get(':idAdministrator/:idQuiz')
  findOne(@Param('idAdministrator') idAdministrator: number, @Param('idQuiz') idQuiz: number) {
    return this.administratorQuizService.findOne(idAdministrator, idQuiz);
  }

  @Post()
  create(@Body() createAdministratorQuizDto: CreateAdministratorQuizDto) {
    return this.administratorQuizService.create(createAdministratorQuizDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdministratorQuizDto: UpdateAdministratorQuizDto) {
    return this.administratorQuizService.update(+id, updateAdministratorQuizDto);
  }

  @Delete(':idAdministrator/:idQuiz')
  remove(@Param('idAdministrator') idAdministrator: number, @Param('idQuiz') idQuiz: number) {
    return this.administratorQuizService.remove(+idAdministrator, +idQuiz);
  }
}
