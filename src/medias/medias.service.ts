import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediasService {

  constructor(
    @InjectRepository(Media) private readonly mediaRepository: Repository<Media>,
  ) {}

  @ApiCreatedResponse({
    description: 'The media have been successfully found.'
  })
  public async findAll(): Promise<Media[]> {
    return this.mediaRepository.find();
  }

  @ApiCreatedResponse({
    description: 'The media has been successfully found.'
  })
  public async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOneBy({idMedia: id});
    if (!media) {
        throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return media;
  }

    @ApiCreatedResponse({
      description: 'The media has been successfully created.'
    }) 
  public async create(type: string, content: string): Promise<Media> {
    // Créer une nouvelle entité media
    const newMedia = this.mediaRepository.create({
      type,
      content
    });        

    return this.mediaRepository.save(newMedia);
  }

  @ApiCreatedResponse({
    description: 'The media has been successfully updated.'
  }) 
  public async update(id: number, type: string, content: string): Promise<Media> {
    // On recherche le media par ID
    const media = await this.mediaRepository.findOneBy({idMedia: id});

    // Si le media n'est pas trouvé, on lève une exception
    if (!media) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }

    // Mise à jour des champs uniquement si des valeurs sont fournies
    if (type !== undefined) {
      media.type = type;
    }

    if (content !== undefined) {
      media.content = content;
    }

    // Retourner le media mis à jour
    return this.mediaRepository.save(media);
  }

  @ApiCreatedResponse({
    description: 'The media has been successfully removed.'
  })
  public async remove(id: number): Promise<Media> {
    // Récupérer le media avant suppression
    const media = await this.mediaRepository.findOneBy({idMedia: id});
    if (!media) {
        throw new NotFoundException(`Media with id ${id} not found`);
    }
    // Supprimer le media
    await this.mediaRepository.delete({idMedia: id});

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    // await this.mediaRepository.query(
    //   `SELECT setval(pg_get_serial_sequence('media', 'idMedia'), 1, false)`
    // );    

    // Retourner le quiz supprimé
    return media;
  }

    @ApiCreatedResponse({
      description: 'The medias have been successfully removed.'
    })
    public async removeAll(): Promise<Media[]> {
  
      const medias = await this.mediaRepository.find();
      
      if (medias.length === 0) {
        throw new NotFoundException(`Media list is empty`);
      }
  
      // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
      await this.mediaRepository.query(
        `TRUNCATE TABLE media RESTART IDENTITY CASCADE;`
      );    
      
      // Retourner les medias supprimés
      return medias;
    }  
}
