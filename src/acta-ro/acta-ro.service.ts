import { Injectable } from '@nestjs/common';
import { CreateActaRoDto } from './dto/create-acta-ro.dto';
import { UpdateActaRoDto } from './dto/update-acta-ro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActaRO } from './entities/acta-ro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActaRoService {
  constructor(
    @InjectRepository(ActaRO)
    private actaRORepository: Repository<ActaRO>,
  ) {}

  async create(createActaRoDto: CreateActaRoDto) {
    const acta = this.actaRORepository.create(createActaRoDto);
    return await this.actaRORepository.save(acta);
  }

  findAll() {
    return `This action returns all actaRo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actaRo`;
  }

  update(id: number, updateActaRoDto: UpdateActaRoDto) {
    return `This action updates a #${id} actaRo,#${updateActaRoDto} `;
  }

  remove(id: number) {
    return `This action removes a #${id} actaRo`;
  }
}
