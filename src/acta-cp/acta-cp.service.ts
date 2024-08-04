import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActaCP } from './entities/acta-cp.entity';
import { CreateActaCpDto } from './dto/create-acta-cp.dto';
import { validate } from 'class-validator';
import { UpdateActaCpDto } from './dto/update-acta-cp.dto';

@Injectable()
export class ActaCpService {
  constructor(
    @InjectRepository(ActaCP)
    private actaCPRepository: Repository<ActaCP>,
  ) {}

  async create(createActaCpDto: CreateActaCpDto) {
    const errors = await validate(createActaCpDto);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }
    const acta = this.actaCPRepository.create(createActaCpDto);
    return await this.actaCPRepository.save(acta);
  }

  async findAll(): Promise<ActaCP[]> {
    return this.actaCPRepository.find();
  }

  async findOne(id: number): Promise<ActaCP | undefined> {
    return this.actaCPRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateActaCpDto: UpdateActaCpDto): Promise<void> {
    await this.actaCPRepository.update(id, updateActaCpDto);
  }
  async remove(id: number): Promise<void> {
    await this.actaCPRepository.delete(id);
  }
}
