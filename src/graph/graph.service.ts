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

  async create(balanceId: number, indicador: string) {
    const balance = await this.balanceRepository.findOne({
      where: { idBal: balanceId },
    });
    if (!balance) {
      throw new Error('Balance not found');
    }

    let valor = 1;
    if (!valor) {
      throw new Error('Value for "values" column is undefined or null');
    }
    if (indicador === 'participant') {
      valor = balance.participants;
    } else if (indicador === 'order') {
      valor = balance.order;
    } else if (indicador === 'agree') {
      valor = balance.agreements;
    }
    const index = balance.month;

    const graph = this.graphRepository.create({
      anno: balance.year,
      core: balance.core,
      indicador: indicador,
      [`values[${index}]`]: valor, //comprobar que no hay nada en esa posicion o sobreescribir??
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
      where: { core, indicador, anno },
    });
    // Comprueba si el grafo fue encontrado
    if (!graph) {
      console.log('Grafo no encontrado');
      return undefined; // O maneja este caso como prefieras
    }
    return graph.values;
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
