import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActaRoDto } from './dto/create-acta-ro.dto';
import { UpdateActaRoDto } from './dto/update-acta-ro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActaRO } from './entities/acta-ro.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { BalanceService } from 'src/balance/balance.service';  // Asegúrate de importar BalanceService

@Injectable()
export class ActaRoService {
  constructor(
    @InjectRepository(ActaRO)
    private actaRORepository: Repository<ActaRO>,
    private balanceService: BalanceService,  // Inyección de BalanceService
  ) {}

  async create(createActaRoDto: CreateActaRoDto) {
    const errors = await validate(createActaRoDto);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }
    const acta = this.actaRORepository.create(createActaRoDto);
    const savedActa = await this.actaRORepository.save(acta);

    // Llama a createBalance después de guardar ActaRO
    await this.balanceService.createBalance(savedActa.id);

    return savedActa;
  }

  async findAll(): Promise<ActaRO[]> {
    return this.actaRORepository.find();
  }

  async findOne(id: number): Promise<ActaRO | undefined> {
    return this.actaRORepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateActaRoDto: UpdateActaRoDto): Promise<void> {
    const acta = await this.findOne(id);
    if (!acta) {
      throw new NotFoundException();
    }

    Object.assign(acta, updateActaRoDto);
    await this.actaRORepository.save(acta);
  }

  async remove(id: number): Promise<void> {
    await this.actaRORepository.delete(id);
  }
}
