import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Administrator } from './entities/administrator.entity';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PassThrough } from 'stream';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Admin, Repository } from 'typeorm';


@Injectable()
export class AdministratorsService {

  constructor(
    @InjectRepository(Administrator) private readonly administratorRepository: Repository<Administrator>,
  ) {}

  @ApiCreatedResponse({
    description: 'The administrator have been successfully found.'
  })
  public async getAll(): Promise<Administrator[]> {
    return this.administratorRepository.find();
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully found.'
  })
  public async findOne(id: number): Promise<Administrator> {
    const administrator = await this.administratorRepository.findOneBy({idAdministrator: id});
    if (!administrator) {
        throw new NotFoundException(`Administrator with id ${id} not found`);
    }
    return administrator;
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully found.'
  })
  public async exists(name: string, pw: string): Promise<Boolean> {
    const administrator = await this.administratorRepository.findOneBy({username: name, password: pw});
    if (!administrator) {
        throw new NotFoundException(`Administrator with id ${name} and ${pw} not found`);
    }
    return true;
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully created.'
  })
  public async create(username: string, password: string): Promise<Administrator> {
    const lastAdmin = await this.administratorRepository.findOneBy({username: username});
    if (lastAdmin) {
      throw new NotFoundException(`Administrator with id ${username} already exists`);
    }
    // Créer une nouvelle entité administrator
    const newAdministrator = this.administratorRepository.create({
      username,
      password,
    });        

    return this.administratorRepository.save(newAdministrator);
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully updated.'
  })
  public async update(id: number, username?: string, password?: string): Promise<Administrator> {
    // On recherche l'administrateur par ID
    const administrator = await this.administratorRepository.findOneBy({idAdministrator: id});

    // Si l'administrateur n'est pas trouvé, on lève une exception
    if (!administrator) {
      throw new NotFoundException(`Administrator with id ${id} not found`);
    }

    // Mise à jour des champs uniquement si des valeurs sont fournies
    if (username !== undefined) {
      administrator.username = username;
    }
    if (password !== undefined) {
      administrator.password = password;
    }

    // Retourner l'administrateur mis à jour
    return this.administratorRepository.save(administrator);
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully removed.'
  })
  public async remove(id: number): Promise<Administrator> {

    // Récupérer l'administrateur avant suppression
    const administrator = await this.administratorRepository.findOneBy({idAdministrator: id});
    if (!administrator) {
        throw new NotFoundException(`Administrator with id ${id} not found`);
    }
    // Supprimer l'administrateur
    await this.administratorRepository.delete({idAdministrator: id});

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    // await this.administratorRepository.query(
    //   `SELECT setval(pg_get_serial_sequence('administrator', 'idAdministrator'), 1, false)`
    // );    
    

    // Retourner l'administrateur supprimé
    return administrator;

  }

  @ApiCreatedResponse({
    description: 'The administrators have been successfully removed.'
  })
  public async removeAll(): Promise<Administrator[]> {

    const administrators = await this.administratorRepository.find();
    
    if (administrators.length === 0) {
      throw new NotFoundException(`Administrator list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.administratorRepository.query(
      `TRUNCATE TABLE administrator RESTART IDENTITY CASCADE;`
    );    
    
    // Retourner l'administrateur supprimé
    return administrators;
  }


}
