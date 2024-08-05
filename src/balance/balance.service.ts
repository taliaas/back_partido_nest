import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './entities/balance.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
    @InjectRepository(ActaRO)
    private actaRORepository: Repository<ActaRO>,
  ) {}

  async create(createBalanceDto: CreateBalanceDto) {
    const text = (await this.actaRORepository.findOne({ where: { id: 2 } }))
      .development;
    const crecimiento = await this.findCreciment(text);
    createBalanceDto.crecim = crecimiento;

    // Continúa con la creación del nuevo balance
    const newBalance = this.balanceRepository.create(createBalanceDto);
    return await this.balanceRepository.save(newBalance);
  }
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
}
