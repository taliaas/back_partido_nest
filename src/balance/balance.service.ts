import { Injectable } from '@nestjs/common';
import { Balance } from './entities/balance.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';
import { ActaCP } from 'src/acta-cp/entities/acta-cp.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
    @InjectRepository(ActaRO)
    private actaRORepository: Repository<ActaRO>,
    @InjectRepository(ActaCP)
    private actaCpRepository: Repository<ActaCP>,
  ) {}

  async findCreciment(text: string): Promise<number> {
    const word = 'crecimiento';
    return text.includes(word) ? 1 : 0;
  }

  async findAll() {
    return await this.balanceRepository.find();
  }

  async findOne(idBal: number) {
    return await this.balanceRepository.findOne({
      where: { idBal },
    });
  }

  //funcion para eliminar el balance
  async deleteBalanceByActaROId(actaRoId: number): Promise<void> {
    await this.balanceRepository.delete({ minutes: actaRoId });
  }

  //funcion para crear el balance
  async create(actaRoId: number) {
    const actaRo = await this.actaRORepository.findOne({
      where: { id: actaRoId },
    });
    if (!actaRo) {
      throw new Error('Acta RO not found');
    }

    const crecimValue = await this.findCreciment(actaRo.development);
    const actaCp = await this.actaCpRepository.findOne({
      where: { idRO: actaRoId },
    });
    const date = new Date(actaRo.day);
    const month = date.getMonth() + 1;

    const balance = this.balanceRepository.create({
      core: actaRo.nucleo,
      minutes: actaRo.id,
      order: (actaRo.order.match(/desc/g) || []).length,
      participants: actaRo.present,
      agreements: (actaRo.agreements.match(/desc/g) || []).length,
      cp: actaCp ? 1 : 0,
      agreements_cp: actaCp
        ? (actaCp.agreements.match(/desc/g) || []).length
        : 0,
      month: month,
      crecim: crecimValue,
    });
    await this.balanceRepository.save(balance);
  }

  async updateBalanceByActaROId(actaRoId: number): Promise<void> {
    const actaRo = await this.actaRORepository.findOne({
      where: { id: actaRoId },
    });
    if (!actaRo) {
      throw new Error('Acta RO not found');
    }

    const balance = await this.balanceRepository.findOne({
      where: { minutes: actaRoId },
    });
    if (!balance) {
      throw new Error('Balance not found');
    }

    // Actualiza los valores del balance basados en el acta actualizada
    balance.core = actaRo.nucleo;
    balance.order = (actaRo.order.match(/desc/g) || []).length;
    balance.participants = actaRo.present;
    balance.agreements = (actaRo.agreements.match(/desc/g) || []).length;

    const crecimValue = await this.findCreciment(actaRo.development);
    balance.crecim = crecimValue;

    const actaCp = await this.actaCpRepository.findOne({
      where: { idRO: actaRoId },
    });
    balance.cp = actaCp ? 1 : 0;
    balance.agreements_cp = actaCp
      ? (actaCp.agreements.match(/desc/g) || []).length
      : 0;

    await this.balanceRepository.save(balance);
  }
}
