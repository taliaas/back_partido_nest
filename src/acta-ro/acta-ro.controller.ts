import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActaRoService } from './acta-ro.service';
import { CreateActaRoDto } from './dto/create-acta-ro.dto';
import { UpdateActaRoDto } from './dto/update-acta-ro.dto';
import { Role } from 'src/common/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('acta-ro')
export class ActaRoController {
  constructor(private readonly actaRoService: ActaRoService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createActaRoDto: CreateActaRoDto) {
    return this.actaRoService.create(createActaRoDto);
  }

  @Get()
  findAll() {
    return this.actaRoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actaRoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActaRoDto: UpdateActaRoDto) {
    return this.actaRoService.update(+id, updateActaRoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actaRoService.remove(+id);
  }

  @Get('zero') // Define un endpoint para obtener actas con cp igual a 0
  async findActas(): Promise<any> {
    return await this.actaRoService.findActas();
  }
}
