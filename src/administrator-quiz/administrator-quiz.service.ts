import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministratorQuizDto } from './dto/create-administrator-quiz.dto';
import { UpdateAdministratorQuizDto } from './dto/update-administrator-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministratorQuiz } from './entities/administrator-quiz.entity';
import { Repository } from 'typeorm';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class AdministratorQuizService {

  constructor(
    @InjectRepository(AdministratorQuiz) private readonly administratorQuizRepository: Repository<AdministratorQuiz>,
    private readonly administratorsService: AdministratorsService,
    private readonly quizService: QuizService
  ) {}

  @ApiCreatedResponse({
    description: 'The administrator-quiz have been successfully found.'
  })
  public async findAll(): Promise<AdministratorQuiz[]> {
    return this.administratorQuizRepository.find();
  }

  @ApiCreatedResponse({
    description: 'The administrator-quiz has been successfully found.'
  })
  public async findOne(idA: number, idQ: number): Promise<AdministratorQuiz> {
    const administrator_quiz = await this.administratorQuizRepository.findOneBy({idAdministrator: idA, idQuiz: idQ});
    if (!administrator_quiz) {
        throw new NotFoundException(`AdministratorQuiz with id ${idA} and ${idQ} not found`);
    }
    return administrator_quiz;
  }

  @ApiCreatedResponse({
    description: 'The quizzes of the administrator has been successfully found.'
  })
  public async findOneByAdmin(idA: number): Promise<AdministratorQuiz[]> {
    const administrator_quiz = await this.administratorQuizRepository.findBy({idAdministrator: idA});
    if (!administrator_quiz) {
        throw new NotFoundException(`AdministratorQuiz with id ${idA} not found`);
    }
    return administrator_quiz;
  }

  @ApiCreatedResponse({
    description: 'The administrator-quiz has been successfully created.'
  })
  public async create(idAdministrator: number, idQuiz: number): Promise<AdministratorQuiz> {
    try {
      await this.administratorsService.findOne(idAdministrator);
      await this.quizService.findOne(idQuiz);
    } catch (error) {
      throw new NotFoundException(`AdministratorQuiz with id ${idAdministrator} and ${idQuiz} not found`);
    }
  
    const newAdministratorQuiz = this.administratorQuizRepository.create({
      idAdministrator,
      idQuiz,
    });
  
    return this.administratorQuizRepository.save(newAdministratorQuiz);
  }
  

  @ApiCreatedResponse({
    description: 'The administrator-quiz has been successfully updated.'
  })
  public async update(idA: number, idQ: number): Promise<AdministratorQuiz> {

    if (!this.administratorsService.findOne(idA) || !this.quizService.findOne(idQ)){
      throw new NotFoundException(`AdministratorQuiz with id ${idA} and ${idQ} not found`); 
    }  

    // On recherche l'administrateur-quiz par ID
    const administratorQuiz = await this.administratorQuizRepository.findOneBy({idAdministrator: idA, idQuiz: idQ});

    // Si l'administrateur-quiz n'est pas trouvé, on lève une exception
    if (!administratorQuiz) {
      throw new NotFoundException(`Administrator with id ${idA} and ${idQ} not found`);
    }

    // Mise à jour des champs uniquement si des valeurs sont fournies
    if (idA !== undefined) {
      administratorQuiz.idAdministrator = idA;
    }
    if (idQ !== undefined) {
      administratorQuiz.idQuiz = idQ;
    }

    // Retourner l'administrateur mis à jour
    return this.administratorQuizRepository.save(administratorQuiz);
  }

  @ApiCreatedResponse({
    description: 'The administrator-quiz has been successfully removed.'
  })
  public async remove(idA: number, idQ: number): Promise<AdministratorQuiz> {
    // Récupérer l'administrateur-quiz avant suppression
    const administrator_quiz = await this.administratorQuizRepository.findOneBy({idAdministrator: idA, idQuiz: idQ});
    if (!administrator_quiz) {
        throw new NotFoundException(`AdministratorQuiz with id ${idA} and ${idQ} not found`);
    }
    // Supprimer l'administrateur-quiz
    await this.administratorQuizRepository.delete({idAdministrator: idA, idQuiz: idQ});

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    // await this.administratorQuizRepository.query(
    //   `SELECT setval(pg_get_serial_sequence('administrator', 'idAdministrator'), 1, false)`
    // );    
    

    // Retourner l'administrateur supprimé
    return administrator_quiz;
  }

  @ApiCreatedResponse({
    description: 'The administrator-quiz have been successfully removed.'
  })
  public async removeAll(): Promise<AdministratorQuiz[]> {

    const administratorQuiz = await this.administratorQuizRepository.find();
    
    if (administratorQuiz.length === 0) {
      throw new NotFoundException(`AdministratorQuiz list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.administratorQuizRepository.query(
      `TRUNCATE TABLE "administrator_quiz" RESTART IDENTITY CASCADE;`
    );    
    
    // Retourner l'administrateur-quiz supprimé
    return administratorQuiz;
  }

  @ApiCreatedResponse({
    description: 'All the quizzes have been successfully removed for this administrator.'
  })
  public async removeAllByAdmin(idA: number): Promise<AdministratorQuiz[]> {
    console.log("idA", idA);
    
    const administratorQuizService = new AdministratorQuizService(
      this.administratorQuizRepository,
      this.administratorsService,
      this.quizService,
    );
    
    // Récupérer tous les quiz associés à l'administrateur
    const administratorQuiz = await administratorQuizService.findOneByAdmin(idA);
    
    if (administratorQuiz.length === 0) {
      throw new NotFoundException(`No quizzes found for the administrator with id ${idA}`);
    }
  
    // Supprimer chaque quiz un par un
    for (const quiz of administratorQuiz) {
      console.log(quiz);
      await this.remove(idA, quiz.idQuiz); // Appeler la méthode remove pour chaque quiz
      await this.quizService.remove(+quiz.idQuiz);
    }
    
    // Retourner une réponse de succès
    return administratorQuiz;
  }
  
   
}
