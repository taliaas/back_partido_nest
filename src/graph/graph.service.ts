import { Injectable } from '@nestjs/common';
import { UpdateGraphDto } from './dto/update-graph.dto';
import { Graph } from './entities/graph.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(Graph)
    private graphRepository: Repository<Graph>,
  ) {}

  async findAll() {
    return await this.graphRepository.find();
  }

  async findOne(id: number) {
    return await this.graphRepository.findOne({
      where: { id },
    });
  }

  //hacer despues
  update(id: number, updateGraphDto: UpdateGraphDto) {
    return `This action updates a #${id}#${updateGraphDto} graph`;
  }

  //solo elimina cuando este valores null
  remove(id: number) {
    return `This action removes a #${id} graph`;
  }
}
