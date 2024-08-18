import { Injectable } from '@nestjs/common';
import { UpdateGraphDto } from './dto/update-graph.dto';
import { Graph } from './entities/graph.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGraphDto } from './dto/create-graph.dto';

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(Graph)
    private graphRepository: Repository<Graph>,
  ) {}

  async create(createGraphDto: CreateGraphDto) {
    return this.graphRepository.save(createGraphDto);
  }

  async findAll() {
    return await this.graphRepository.find();
  }

  async findOne(id: number) {
    return await this.graphRepository.findOne({
      where: { id },
    });
  }

  async findByCore(core: number, indicador: string) {
    const graph = await this.graphRepository.findOne({
      where: { core, indicador },
    });
    // Comprueba si el grafo fue encontrado
    if (!graph) {
      console.log('Grafo no encontrado');
      return undefined; // O maneja este caso como prefieras
    }
    return graph.valores;
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
