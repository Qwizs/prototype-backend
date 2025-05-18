import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdministratorsService } from './administrators.service';
import { Administrator } from './entities/administrator.entity';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { QuizService } from 'src/quiz/quiz.service';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@ApiTags('administrators')
@Controller('administrators')
export class AdministratorsController {
  constructor(
    private readonly administratorsService: AdministratorsService,
    private readonly quizService: QuizService,
  ) {}

  @Get()
  public async getAll(): Promise<Administrator[]> {
    return this.administratorsService.getAll();
  }

  @Get('/usernames')
  public async getAllUsernames(): Promise<string[]> {
    return (await this.administratorsService.getAll()).map(
      (admin) => admin.username,
    );
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Administrator> {
    return this.administratorsService.findOne(+id);
  }

  @Get(':id/quizs')
  public async findQuizs(@Param('id') id: number): Promise<Quiz[]> {
    return this.quizService.findQuizsAdmin(+id);
  }

  @Post('/verify')
  public async verify(
    @Body() body: { username: string; password: string },
  ): Promise<Administrator> {
    return this.administratorsService.verify(body.username, body.password);
  }

  @Post()
  public async create(
    @Body() createAdministratorDto: CreateAdministratorDto,
  ): Promise<Administrator> {
    return this.administratorsService.create(
      createAdministratorDto.username,
      createAdministratorDto.password,
    );
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() updateAdministratorDto: UpdateAdministratorDto,
  ): Promise<Administrator> {
    return this.administratorsService.update(
      +id,
      updateAdministratorDto.username,
      updateAdministratorDto.password,
    );
  }

  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<Administrator> {
    return this.administratorsService.remove(+id);
  }

  @Delete()
  public async removeAll(): Promise<Administrator[]> {
    return this.administratorsService.removeAll();
  }
}
