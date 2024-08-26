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

@Controller('acta-ro')
export class ActaRoController {
  constructor(private readonly actaRoService: ActaRoService) {}

  @Post()
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

  @Get('core')
  getAllCore() {
    return this.actaRoService.getAllCore();
  }

  @Get('/cp-zero-ids')
  async getActasWithCpZeroIds(): Promise<number[]> {
    return this.actaRoService.getActasWithCpZero();
  }
}
