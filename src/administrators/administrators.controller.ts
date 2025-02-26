import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdministratorsService } from './administrators.service';
import { Administrator } from './entities/administrator.entity';
import { retry } from 'rxjs';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { CreateAdministratorDto } from './dto/create-administrator.dto';

@ApiTags('administrators')
@Controller('administrators')
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @Get('all')
  getAll(): Administrator[] {
    return this.administratorsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.administratorsService.findOne(+id);
  }

  @Post()
  public async create(@Body() createAdministratorDto: CreateAdministratorDto): Promise<Administrator>  {
    return this.administratorsService.create(createAdministratorDto);
  }

  @Put(':id')
  public async update(@Param('id') id: number, @Body() updateAdministratorDto: UpdateAdministratorDto): Promise<Administrator> {
    //console.log("Données reçues :", updateAdministratorDto);
    return this.administratorsService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<Administrator> {
    return this.administratorsService.remove(+id);
  }
}
