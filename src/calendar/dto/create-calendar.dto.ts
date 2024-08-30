import { IsNumber } from 'class-validator';

export class CreateCalendarDto {
  details: string;

  @IsNumber()
  core: number;

  fecha: Date;
}
