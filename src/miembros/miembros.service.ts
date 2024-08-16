import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMiembroDto } from './dto/create-miembro.dto';
import { UpdateMiembroDto } from './dto/update-miembro.dto';
import { Miembro } from './entities/miembro.entity';
import { NucleoService } from 'src/nucleo/nucleo.service';

@Injectable()
export class MiembrosService {
  constructor(
    @InjectRepository(Miembro)
    private miembroRepository: Repository<Miembro>,
    private readonly nucleoService: NucleoService,
  ) {}

  async create(createMiembroDto: CreateMiembroDto) {
    const { name, nucleoId } = createMiembroDto;

    // Crear el nuevo miembro
    const newMiembro = this.miembroRepository.create(createMiembroDto);
    await this.miembroRepository.save(newMiembro);

    // Agregar el nombre del miembro al nucleo correspondiente. 
    await this.nucleoService.addMiembroToNucleo(nucleoId, name);

    return newMiembro;
  }

  findAll() {
    return `This action returns all miembros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} miembro`;
  }

  update(id: number, updateMiembroDto: UpdateMiembroDto) {
    return `This action updates a #${id} miembro`;
  }

  remove(id: number) {
    return `This action removes a #${id} miembro`;
  }
}

