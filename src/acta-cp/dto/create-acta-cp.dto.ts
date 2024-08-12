import { Timestamp } from 'typeorm';

export class CreateActaCpDto {
  id: number;

  missing: number;

  present: number;

  hour: Timestamp;

  day: Date;

  topic: string;

  development: string;

  agreements: string;

  idatacro: number;
}
