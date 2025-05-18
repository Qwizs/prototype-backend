import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Administrator } from './entities/administrator.entity';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PassThrough } from 'stream';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Admin, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
  ) {}

  @ApiCreatedResponse({
    description: 'The administrator have been successfully found.',
  })
  public async getAll(): Promise<Administrator[]> {
    return this.administratorRepository.find();
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully found.',
  })
  public async findOne(id: number): Promise<Administrator> {
    const administrator = await this.administratorRepository.findOneBy({
      idAdministrator: id,
    });
    if (!administrator) {
      throw new NotFoundException(`Administrator with id ${id} not found`);
    }
    return administrator;
  }

  @ApiCreatedResponse({
    description: 'The id has been successfully found.',
  })
  public async findByName(name: string): Promise<Administrator> {
    const administrator = await this.administratorRepository.findOneBy({
      username: name,
    });
    if (!administrator) {
      throw new NotFoundException(`Administrator with id ${name} notfound`);
    }
    return administrator;
  }

  public async verify(
    username: string,
    password: string,
  ): Promise<Administrator> {
    const administrator = await this.administratorRepository.findOneBy({
      username,
    });

    if (!administrator) {
      throw new NotFoundException(`Utilisateur "${username}" introuvable`);
    }

    const isValid = await bcrypt.compare(password, administrator.password);

    if (!isValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    return administrator;
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully created.',
  })
  public async create(
    username: string,
    password: string,
  ): Promise<Administrator> {
    const lastAdmin = await this.administratorRepository.findOneBy({
      username: username,
    });
    if (lastAdmin) {
      throw new NotFoundException(
        `Administrator with id ${username} already exists`,
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdministrator = this.administratorRepository.create({
      username,
      password: hashedPassword,
    });

    return this.administratorRepository.save(newAdministrator);
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully updated.',
  })
  public async update(
    id: number,
    username?: string,
    password?: string,
  ): Promise<Administrator> {
    console.log(username, password);

    const administrator = await this.administratorRepository.findOneBy({
      idAdministrator: id,
    });

    if (!administrator) {
      throw new NotFoundException(`Administrator with id ${id} not found`);
    }
    if (username !== undefined && username !== '') {
      administrator.username = username;
    }
    if (password !== undefined && password !== '') {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      administrator.password = hashedPassword;
    }

    return this.administratorRepository.save(administrator);
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully removed.',
  })
  public async remove(id: number): Promise<Administrator> {
    // Récupérer l'administrateur avant suppression
    const administrator = await this.administratorRepository.findOneBy({
      idAdministrator: id,
    });
    if (!administrator) {
      throw new NotFoundException(`Administrator with id ${id} not found`);
    }
    // Supprimer l'administrateur
    await this.administratorRepository.delete({ idAdministrator: id });

    return administrator;
  }

  @ApiCreatedResponse({
    description: 'The administrators have been successfully removed.',
  })
  public async removeAll(): Promise<Administrator[]> {
    const administrators = await this.administratorRepository.find();

    if (administrators.length === 0) {
      throw new NotFoundException(`Administrator list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.administratorRepository.query(
      `TRUNCATE TABLE administrator RESTART IDENTITY CASCADE;`,
    );

    // Retourner l'administrateur supprimé
    return administrators;
  }
}
