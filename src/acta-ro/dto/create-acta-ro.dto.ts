import { Timestamp } from 'typeorm';

export class CreateActaRoDto {
  id: number;

  nucleo: number;

  area: number;

  missing: number;

  present: number;

  hour: Timestamp;

  day: Date;

  members: string;

  order: string;

  development: string;

  agreements: string;

  cp: boolean;
}
