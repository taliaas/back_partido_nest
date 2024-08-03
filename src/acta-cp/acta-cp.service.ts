import { Injectable } from '@nestjs/common';
import { CreateActaCpDto } from './dto/create-acta-cp.dto';
import { UpdateActaCpDto } from './dto/update-acta-cp.dto';

@Injectable()
export class ActaCpService {
  create(createActaCpDto: CreateActaCpDto) {
    return 'This action adds a new actaCp';
  }

  findAll() {
    return `This action returns all actaCp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actaCp`;
  }

  update(id: number, updateActaCpDto: UpdateActaCpDto) {
    return `This action updates a #${id} actaCp`;
  }

  remove(id: number) {
    return `This action removes a #${id} actaCp`;
  }
}
