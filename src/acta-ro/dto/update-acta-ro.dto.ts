import { PartialType } from '@nestjs/mapped-types';
import { CreateActaRoDto } from './create-acta-ro.dto';

export class UpdateActaRoDto extends PartialType(CreateActaRoDto) {}
