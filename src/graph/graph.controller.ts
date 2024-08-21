import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { GraphService } from './graph.service';
import { UpdateGraphDto } from './dto/update-graph.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  findAll() {
    return this.graphService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graphService.findOne(+id);
  }

  @Get(':core/:indicador/:anno')
  async findGraph(
    @Param('core') core: number,
    @Param('indicador') indicador: string,
    @Param('anno') anno: number,
  ) {
    return await this.graphService.findByCore(core, indicador, anno);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGraphDto: UpdateGraphDto) {
    return this.graphService.update(+id, updateGraphDto);
  }
}
