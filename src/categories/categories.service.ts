import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  @ApiCreatedResponse({
    description: 'The categories have been successfully found.'
  })
  public async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  @ApiCreatedResponse({
    description: 'The category has been successfully found.'
  }) 
  public async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({idCategory: id});
    if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  @ApiCreatedResponse({
    description: 'The category has been successfully created.'
  })  
  public async create(name: string): Promise<Category> {
    // Créer une nouvelle entité category
    const newCategory = this.categoryRepository.create({
      name
    });        

    return this.categoryRepository.save(newCategory);
  }

  @ApiCreatedResponse({
    description: 'The category has been successfully updated.'
  })
  public async update(id: number, name?: string): Promise<Category> {
    // On recherche la catégorie par ID
    const category = await this.categoryRepository.findOneBy({idCategory: id});
    console.log("Category : ", category);

    // Si la catégorie n'est pas trouvé, on lève une exception
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    // Mise à jour des champs uniquement si des valeurs sont fournies
    if (name !== undefined) {
      category.name = name;
    }

    // Retourner la catégorie mise à jour
    return this.categoryRepository.save(category);
  }

  @ApiCreatedResponse({
    description: 'The category has been successfully removed.'
  })
  public async remove(id: number): Promise<Category> {
    // Récupérer la catégorie avant suppression
    const category = await this.categoryRepository.findOneBy({idCategory: id});
    if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
    }
    // Supprimer la catégorie
    await this.categoryRepository.delete({idCategory: id});

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    // await this.categoryRepository.query(
    //   `SELECT setval(pg_get_serial_sequence('category', 'idCategory'), 1, false)`
    // );    
    

    // Retourner l'administrateur supprimé
    return category;
  }

  @ApiCreatedResponse({
    description: 'The categories have been successfully removed.'
  })
  public async removeAll(): Promise<Category[]> {

    const categories = await this.categoryRepository.find();
    
    if (categories.length === 0) {
      throw new NotFoundException(`Category list is empty`);
    }

    // Réinitialiser la séquence de la base de données SQLite pour l'auto-incrément
    await this.categoryRepository.query(
      `TRUNCATE TABLE category RESTART IDENTITY CASCADE;`
    );    
    
    // Retourner l'administrateur supprimé
    return categories;
  }  
}
