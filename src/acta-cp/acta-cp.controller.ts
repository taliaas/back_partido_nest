import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActaCpService } from './acta-cp.service';
import { CreateActaCpDto } from './dto/create-acta-cp.dto';
import { UpdateActaCpDto } from './dto/update-acta-cp.dto';

@Controller('acta-cp')
export class ActaCpController {
  constructor(private readonly actaCpService: ActaCpService) {}

  @Post()
  create(@Body() createActaCpDto: CreateActaCpDto) {
    return this.actaCpService.create(createActaCpDto);
  }

  @Get()
  findAll() {
    return this.actaCpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actaCpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActaCpDto: UpdateActaCpDto) {
    return this.actaCpService.update(+id, updateActaCpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actaCpService.remove(+id);
  }
}
