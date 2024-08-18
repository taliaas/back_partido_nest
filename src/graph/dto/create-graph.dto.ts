import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGraphDto {
  @IsNumber()
  id: number;

  @IsNumber()
  core: number;

  @IsNumber()
  anno: number;

  @IsNotEmpty()
  indicador: string;

  valores: number[];
}
