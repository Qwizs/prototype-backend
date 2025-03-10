import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdministratorQuizDto } from './dto/create-administrator-quiz.dto';
import { UpdateAdministratorQuizDto } from './dto/update-administrator-quiz.dto';
import { AdministratorQuiz } from './entities/administrator-quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorQuizService {

  constructor(
    @InjectRepository(AdministratorQuiz) private readonly administratorQuizRepository: Repository<AdministratorQuiz>,
  ) {}

  public getAll(): Promise<AdministratorQuiz[]> {
    return this.administratorQuizRepository.find();
  }

  public async findOne(idAdministrator: number, idQuiz: number)  {
    return `This action returns a #${idAdministrator} #${idQuiz} administratorQuiz`;
  }

  public async create(createAdministratorQuizDto: CreateAdministratorQuizDto) {
    return 'This action adds a new administratorQuiz';
  }

  public async update(id: number, updateAdministratorQuizDto: UpdateAdministratorQuizDto) {
    return `This action updates a #${id} administratorQuiz`;
  }

  public async remove(idAdministrator: number, idQuiz: number) {
    return `This action removes a #${idAdministrator} #${idQuiz} administratorQuiz`;
  }
}
