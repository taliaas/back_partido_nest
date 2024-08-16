import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NucleoService } from './nucleo.service';
import { CreateNucleoDto } from './dto/create-nucleo.dto';
import { UpdateNucleoDto } from './dto/update-nucleo.dto';

@Controller('nucleo')
export class NucleoController {
  constructor(private readonly nucleoService: NucleoService) {}

  @Post()
  create(@Body() createNucleoDto: CreateNucleoDto) {
    return this.nucleoService.create(createNucleoDto);
  }

  @Get()
  findAll() {
    return this.nucleoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nucleoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNucleoDto: UpdateNucleoDto) {
    return this.nucleoService.update(+id, updateNucleoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nucleoService.remove(+id);
  }

   // Nuevo endpoint para obtener los identificadores de núcleos como una cadena separados por coma. 
   @Get('/ids-as-string')
   getNucleoIdsAsString() {
     return this.nucleoService.getNucleoIdsAsString();
   }
}
