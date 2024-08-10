import { Timestamp } from 'typeorm';

export class CreateCalendarDto {
  nucleo: number;

  area: number;

  hour: Timestamp;

  day: Date;
}
