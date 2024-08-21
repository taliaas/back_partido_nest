import { Injectable } from '@nestjs/common';
import { CreateNucleoDto } from './dto/create-nucleo.dto';
import { UpdateNucleoDto } from './dto/update-nucleo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nucleo } from './entities/nucleo.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class NucleoService {
  constructor(
    @InjectRepository(Nucleo)
    private nucleoRepository: Repository<Nucleo>,
  ) {}

  async create(createNucleoDto: CreateNucleoDto) {
    const errors = await validate(createNucleoDto);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }
    const nucleo = this.nucleoRepository.create(createNucleoDto);
    return await this.nucleoRepository.save(nucleo);
  }

  async findAll() {
    return await this.nucleoRepository.find();
  }

  async findId() {
    return '';
  }
  async findOne(id: number) {
    return await this.nucleoRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateNucleoDto: UpdateNucleoDto) {
    return this.nucleoRepository.save(updateNucleoDto);
  }

  remove(id: number) {
    return `This action removes a #${id} nucleo`;
  }
}
