import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Calendar } from './entities/calendar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
  ) {}

  async create(createCalendarDto: CreateCalendarDto) {
    const errors = await validate(createCalendarDto);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }
    const calendar = this.calendarRepository.create(createCalendarDto);
    const saveCalendar = await this.calendarRepository.save(calendar);
    return saveCalendar;
  }

  async findAll() {
    return await this.calendarRepository.find();
  }

  async findOne(id: number) {
    return await this.calendarRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCalendarDto: UpdateCalendarDto) {
    const calendar = await this.findOne(id);
    if (!calendar) {
      throw new NotFoundException();
    }

    Object.assign(calendar, updateCalendarDto);
    await this.calendarRepository.save(calendar);

    return calendar;
  }

  async remove(id: number) {
    const calendar = await this.findOne(id);
    if (!calendar) {
      throw new NotFoundException();
    }
    await this.calendarRepository.delete(id);
  }
}
