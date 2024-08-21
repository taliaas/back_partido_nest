import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActaCP } from './entities/acta-cp.entity';
import { CreateActaCpDto } from './dto/create-acta-cp.dto';
import { validate } from 'class-validator';
import { UpdateActaCpDto } from './dto/update-acta-cp.dto';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';
import { ActaRoService } from 'src/acta-ro/acta-ro.service';

@Injectable()
export class ActaCpService {
  constructor(
    @InjectRepository(ActaCP)
    private actaCPRepository: Repository<ActaCP>,
    @InjectRepository(ActaRO)
    private actaRORepository: Repository<ActaRO>,
    private actaROService: ActaRoService,
  ) {}

  async create(createActaCpDto: CreateActaCpDto): Promise<ActaCP | undefined> {
    const errors = await validate(createActaCpDto);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }

    // Primero, busca si existe una ActaRO con el idRO dado
    const actaROExists = await this.actaRORepository.findOne({
      where: { id: createActaCpDto.idRO },
    });
    if (!actaROExists) {
      throw new Error('ActaRO no existe');
    }

    // Luego, verifica si no existe un ActaCP con el mismo idRO
    const actaCPExists = await this.actaCPRepository.findOne({
      where: { idRO: createActaCpDto.idRO },
    });
    if (actaCPExists) {
      throw new Error('Ya existe un ActaCP con este idRO');
    }

    const acta = this.actaCPRepository.create(createActaCpDto);
    const save = await this.actaCPRepository.save(acta);
    await this.actaROService.updateCpToById(createActaCpDto.idRO);
    return save;
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
