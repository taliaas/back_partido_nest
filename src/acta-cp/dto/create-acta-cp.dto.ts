import { Timestamp } from 'typeorm';

export class CreateActaCpDto {
  missing: number;

  present: number;

  hour: Timestamp;

  day: Date;

  topic: string;

  development: string;

  agreements: string;

  idRO: number;
}
