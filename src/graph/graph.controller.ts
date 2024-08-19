import { Controller, Get, Param, Post } from '@nestjs/common';
import { GraphService } from './graph.service';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post()
  create(@Param('id') id: number, @Param('indicador') indicador: string) {
    return this.graphService.create(id, indicador);
  }

  @Get()
  findAll() {
    return this.graphService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graphService.findOne(+id);
  }

  @Get(':core/:indicador')
  async findGraph(
    @Param('core') core: number,
    @Param('indicador') indicador: string,
    @Param('anno') anno: number,
  ) {
    return await this.graphService.findByCore(core, indicador, anno);
  }
}
