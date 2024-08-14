import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBalanceDto } from './dto/update-balance.dto';
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

  async update(idBal: number, updateBalanceDto: UpdateBalanceDto) {
    const user = await this.findOne(idBal);
    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateBalanceDto);
    return await this.balanceRepository.save(user);
  }

  async remove(idBal: number) {
    const bal = await this.findOne(idBal);
    if (!bal) {
      throw new NotFoundException();
    }
    return await this.balanceRepository.remove(bal);
  }

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
}
