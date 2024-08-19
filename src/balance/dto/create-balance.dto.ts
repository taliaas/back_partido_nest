import { IsNumber } from 'class-validator';

export class CreateBalanceDto {
  idBal: number;

  @IsNumber()
  core: number;

  @IsNumber()
  minutes: number;

  @IsNumber()
  order: number;

  @IsNumber()
  participants: number;

  @IsNumber()
  agreements: number;

  @IsNumber()
  crecim: number;

  @IsNumber()
  cp: number;

  @IsNumber()
  agreements_cp: number;

  @IsNumber()
  month: number;

  @IsNumber()
  static crecim: number;

  @IsNumber()
  year: number;
}
