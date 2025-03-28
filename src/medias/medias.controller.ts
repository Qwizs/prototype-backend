import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasService } from './medias.service';
import { Media } from './entities/media.entity';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Get('all')
  public async findAll(): Promise<Media[]>{
    return this.mediasService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Media> {
    return this.mediasService.findOne(+id);
  }

  @Post()
  public async create(@Body() createMediaDto: CreateMediaDto): Promise<Media> {
    return this.mediasService.create(createMediaDto.type, createMediaDto.content);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto): Promise<Media> {
    return this.mediasService.update(+id, updateMediaDto.type, updateMediaDto.content);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<Media> {
    return this.mediasService.remove(+id);
  }
}

