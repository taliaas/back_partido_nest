import { Injectable } from '@nestjs/common';
import { CreateMiembroDto } from './dto/create-miembro.dto';
import { UpdateMiembroDto } from './dto/update-miembro.dto';

@Injectable()
export class MiembrosService {
  create(createMiembroDto: CreateMiembroDto) {
    return 'This action adds a new miembro';
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
