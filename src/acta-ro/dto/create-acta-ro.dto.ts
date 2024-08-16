import { IsInt } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateActaRoDto {
  @IsInt()
  nucleo: number;

  @IsInt()
  missing: number;

  @IsInt()
  present: number;

  hour: Timestamp;

  day: Date;

  members: string;

  order: string;

  development: string;

  agreements: string;

  @IsInt()
  cp: number;
}
