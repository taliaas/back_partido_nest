import { Injectable } from '@nestjs/common';
import { CreateActaRoDto } from './dto/create-acta-ro.dto';
import { UpdateActaRoDto } from './dto/update-acta-ro.dto';

@Injectable()
export class ActaRoService {
  create(createActaRoDto: CreateActaRoDto) {
    return 'This action adds a new actaRo';
  }

  findAll() {
    return `This action returns all actaRo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actaRo`;
  }

  update(id: number, updateActaRoDto: UpdateActaRoDto) {
    return `This action updates a #${id} actaRo`;
  }

  remove(id: number) {
    return `This action removes a #${id} actaRo`;
  }
}
