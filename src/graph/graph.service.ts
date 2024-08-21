import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateGraphDto } from './dto/update-graph.dto';
import { Graph } from './entities/graph.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from 'src/balance/entities/balance.entity';

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(Graph)
    private graphRepository: Repository<Graph>,
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}

  async create(balanceId: number) {
    const balance = await this.balanceRepository.findOne({
      where: { idBal: balanceId },
    });
    if (!balance) {
      throw new Error('Balance not found');
    }
    const index = balance.month;

    const graph = this.graphRepository.create({
      anno: balance.year,
      core: balance.core,
      [`order[${index}]`]: balance.order, //comprobar que no hay nada en esa posicion o sobreescribir??
      [`agree[${index}]`]: balance.agreements,
      [`participant[${index}]`]: balance.participants,
    });
    await this.graphRepository.save(graph);
  }

  async findAll() {
    return await this.graphRepository.find();
  }

  async findOne(id: number) {
    return await this.graphRepository.findOne({
      where: { id },
    });
  }

  async findByCore(core: number, indicador: string, anno: number) {
    const graph = await this.graphRepository.findOne({
      where: { core, anno },
    });

    if (!graph) {
      console.log('Grafo no encontrado');
      return undefined; // O maneja este caso como prefieras
    }
    if (indicador === 'agree') {
      return graph.agreem;
    } else if (indicador === 'participant') {
      return graph.participant;
    } else {
      return graph.order;
    }
  }

  //hacer despues
  async update(id: number, updateGraphDto: UpdateGraphDto) {
    const graph = await this.findOne(id);
    if (!graph) {
      throw new NotFoundException();
    }

    Object.assign(graph, updateGraphDto);
    await this.graphRepository.save(graph);
  }

  //solo elimina cuando este valores null
  remove(id: number) {
    return `This action removes a #${id} graph`;
  }
}
