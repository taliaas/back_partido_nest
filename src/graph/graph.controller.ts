import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GraphService } from './graph.service';
import { CreateGraphDto } from './dto/create-graph.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post()
  create(@Body() createGraphDto: CreateGraphDto) {
    return this.graphService.create(createGraphDto);
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
  ) {
    return await this.graphService.findByCore(core, indicador);
  }
}
