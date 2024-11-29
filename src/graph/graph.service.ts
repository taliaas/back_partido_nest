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
    const balance = await this.getBalance(balanceId);
    const existingGraph = await this.getExistingGraph(balance);

    if (existingGraph) {
      await this.updateExistingGraph(existingGraph, balance);
    } else {
      await this.createNewGraph(balance);
    }
  }

  async getBalance(balanceId: number) {
    const balance = await this.balanceRepository.findOne({
      where: { idBal: balanceId },
    });
    if (!balance) {
      throw new Error('Balance not found');
    }
    return balance;
  }

  async getExistingGraph(balance: Balance) {
    return await this.graphRepository.findOne({
      where: { core: balance.core, anno: balance.year },
    });
  }

  async updateExistingGraph(existingGraph: Graph, balance: Balance) {
    const index = balance.month - 1;
    existingGraph.order[index] = balance.order;
    existingGraph.agreem[index] = balance.agreements;
    existingGraph.participant[index] = balance.participants;
    await this.graphRepository.save(existingGraph);
  }

  async createNewGraph(balance: Balance) {
    const index = balance.month - 1;
    const graph = this.graphRepository.create({
      anno: balance.year,
      core: balance.core,
      order: [],
      participant: [],
      agreem: [],
    });
    graph.order[index] = balance.order;
    graph.agreem[index] = balance.agreements;
    graph.participant[index] = balance.participants;
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
  //si se elimina o se actualiza un acta hay q modificar
  async update(id: number, updateGraphDto: UpdateGraphDto) {
    const graph = await this.findOne(id);
    if (!graph) {
      throw new NotFoundException();
    }

    Object.assign(graph, updateGraphDto);
    await this.graphRepository.save(graph);
  }

  //solo elimina cuando todos los balances sean eliminados
  async remove(id: number) {
    await this.graphRepository.delete(id);
  }
}
