import { Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Calendar } from './entities/calendar.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarioRepository: Repository<Calendar>,
  ) {}
  async create(createCalendarDto: CreateCalendarDto) {
    return createCalendarDto;
  }

  async findAll() {
    return await this.calendarioRepository.find();
  }

  async findOne(id: number) {
    return await this.calendarioRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCalendarDto: UpdateCalendarDto) {
    return updateCalendarDto;
  }

  async remove(id: number) {
    return `This action removes a #${id} calendar`;
  }
}
