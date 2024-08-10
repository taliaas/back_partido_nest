import { Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  create(createCalendarDto: CreateCalendarDto) {
    return createCalendarDto;
  }

  findAll() {
    return `This action returns all calendar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calendar`;
  }

  update(id: number, updateCalendarDto: UpdateCalendarDto) {
    return updateCalendarDto;
  }

  remove(id: number) {
    return `This action removes a #${id} calendar`;
  }
}
