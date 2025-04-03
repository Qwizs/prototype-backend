import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('all')
  public async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(+id);
  }

  @Post()
  public async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto.name);
  }

  @Put(':id')
  public async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(+id, updateCategoryDto.name);
  }

  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.remove(+id);
  }

  @Delete()
  public async removeAll(): Promise<Category[]> {
    return this.categoriesService.removeAll();
  }
}
