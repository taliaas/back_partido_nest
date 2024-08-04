import { Injectable } from '@nestjs/common';
import { CreateActaRoDto } from './dto/create-acta-ro.dto';
import { UpdateActaRoDto } from './dto/update-acta-ro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActaRO } from './entities/acta-ro.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class ActaRoService {
  constructor(
    @InjectRepository(ActaRO)
    private actaRORepository: Repository<ActaRO>,
  ) {}

  async create(createActaRoDto: CreateActaRoDto) {
    const errors = await validate(createActaRoDto);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }
    const acta = this.actaRORepository.create(createActaRoDto);
    return await this.actaRORepository.save(acta);
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
    await this.actaRORepository.update(id, updateActaRoDto);
  }

  async remove(id: number): Promise<void> {
    await this.actaRORepository.delete(id);
  }
}
