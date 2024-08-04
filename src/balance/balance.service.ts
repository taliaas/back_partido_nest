import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './entities/balance.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}

  async create(createBalanceDto: CreateBalanceDto) {
    const newBalance = this.balanceRepository.create(createBalanceDto);
    return await this.balanceRepository.save(newBalance);
  }

  async findAll() {
    return await this.balanceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} balance`;
  }

  update(id: number, updateBalanceDto: UpdateBalanceDto) {
    return updateBalanceDto;
  }

  remove(id: number) {
    return `This action removes a #${id} balance`;
  }
}
