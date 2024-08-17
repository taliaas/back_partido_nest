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

  async create(createActaCpDto: CreateActaCpDto): Promise<ActaCP> {
    try {
      const actaCp = this.actaCPRepository.create(createActaCpDto);
      return await this.actaCPRepository.save(actaCp);
    } catch (error) {
      throw new Error(`Error al crear el acta CP: ${error.message}`);
    }
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
