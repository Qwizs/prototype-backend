import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { Administrator } from './entities/administrator.entity';
import { retry } from 'rxjs';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { CreateAdministratorDto } from './dto/create-administrator.dto';

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
  create(@Body() createAdministratorDto: CreateAdministratorDto): Administrator {
    return this.administratorsService.create(createAdministratorDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAdministratorDto: UpdateAdministratorDto): Administrator {
    //console.log("Données reçues :", updateAdministratorDto);
    return this.administratorsService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Administrator {
    return this.administratorsService.remove(+id);
  }
}
