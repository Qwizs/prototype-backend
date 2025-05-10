import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AdministratorQuizService } from './administrator-quiz.service';
import { CreateAdministratorQuizDto } from './dto/create-administrator-quiz.dto';
import { UpdateAdministratorQuizDto } from './dto/update-administrator-quiz.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdministratorQuiz } from './entities/administrator-quiz.entity';

@ApiTags('administrators-quiz')
@Controller('administrator-quiz')
export class AdministratorQuizController {
  constructor(private readonly administratorQuizService: AdministratorQuizService) {}


  @Get('all')
  public async findAll(): Promise<AdministratorQuiz[]> {
    return this.administratorQuizService.findAll();
  }

  @Get(':idAdministrator/:idQuiz')
  public async findOne(@Param('idAdministrator') idA: number, @Param('idQuiz') idQ: number): Promise<AdministratorQuiz> {
    return this.administratorQuizService.findOne(+idA, +idQ);
  }

  @Get(':idAdministrator/')
  public async findOneByAdmin(@Param('idAdministrator') idA: number): Promise<AdministratorQuiz[]> {
    return this.administratorQuizService.findOneByAdmin(+idA);
  }

  @Post()
  public async create(@Body() createAdministratorQuizDto: CreateAdministratorQuizDto): Promise<AdministratorQuiz> {
    return this.administratorQuizService.create(createAdministratorQuizDto.idAdministrator, createAdministratorQuizDto.idQuiz);
  }

  @Put('1/1/:idAdministrator/:idQuiz')
  public async update(@Body() updateAdministratorQuizDto: UpdateAdministratorQuizDto): Promise<AdministratorQuiz> {
    return this.administratorQuizService.update(updateAdministratorQuizDto.idAdministrator, updateAdministratorQuizDto.idQuiz);
  }

  @Delete(':idAdministrator/:idQuiz')
  public async remove(@Param('idAdministrator') idA: number, @Param('idQuiz') idQ: number): Promise<AdministratorQuiz> {
    return this.administratorQuizService.remove(+idA, +idQ);
  }

  @Delete('all')
  public async removeAll(): Promise<AdministratorQuiz[]> {
    return this.administratorQuizService.removeAll();
  }

  @Delete('1/1/:idAdministrator')
  public async removeAllByAdmin(@Param('idAdministrator') idA: number): Promise<AdministratorQuiz[]> {
    return this.administratorQuizService.removeAllByAdmin(+idA);
  }
}
