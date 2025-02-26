import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Administrator } from './entities/administrator.entity';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { PassThrough } from 'stream';
import { ApiCreatedResponse } from '@nestjs/swagger';

const administrators : Administrator[] = [
  {
    idAdministrator: 0,
    username: 'jdoe',
    password: 'mdpJ'
  },
  {
    idAdministrator: 1,
    username: 'nicki48',
    password: 'mdpN'
  }
]

@Injectable()
export class AdministratorsService {

  @ApiCreatedResponse({
    description: 'The administrators have been successfully found.'
  })
  public getAll(): Administrator[] {
    return administrators;
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully found.'
  })
  public findOne(id: number) {
    return administrators[id];
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully created.'
  })
  public async create(createAdministratorDto: CreateAdministratorDto): Promise<Administrator> {
    console.log("Données reçues :", createAdministratorDto);
    const administrator = new Administrator(administrators.length, createAdministratorDto.username, createAdministratorDto.password);
    administrators.push(administrator);
    return administrator;
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully updated.'
  })
  public async update(id: number, updateAdministratorDto: UpdateAdministratorDto): Promise<Administrator> {
        console.log("Données reçues :", updateAdministratorDto);
        console.log(updateAdministratorDto.username);
        console.log(updateAdministratorDto.password);
        // Rechercher l'administrateur par ID
        const administrator = administrators.find(a => a.idAdministrator === id);

        // Si l'administrateur n'est pas trouvé, lever une exception
        if (!administrator) {
            throw new NotFoundException(`Administrator with id ${id} not found`);
        }

        // Mettre à jour les champs uniquement si des valeurs sont fournies
        if (updateAdministratorDto.username !== undefined) {
          administrator.username = updateAdministratorDto.username;
        }
        if (updateAdministratorDto.password !== undefined) {
        administrator.password = updateAdministratorDto.password;
        }

        // Retourner l'administrateur mis à jour
        return administrator;
  }

  @ApiCreatedResponse({
    description: 'The administrator has been successfully removed.'
  })
  public async remove(id: number): Promise<Administrator> {
        // Rechercher l'utilisateur par ID
        const administrator = administrators.find(a => a.idAdministrator === id);
        // Si l'administrateur n'existe pas, lancer une erreur 404
        if (administrator === undefined) {
            throw new HttpException(`Administrator with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        // Supprimer l'administrateur du tableau
        administrators.splice(administrator.idAdministrator, 1);

        // Réduire l'ID des éléments restants qui ont un ID supérieur à l'ID supprimé
        for (let i = administrator.idAdministrator; i < administrators.length; i++) {
            administrators[i].idAdministrator--;
            console.log("taille =", administrators.length)
        }

        return administrator;
  }
}
