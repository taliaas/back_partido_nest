import { PartialType } from '@nestjs/mapped-types';
import { CreateNucleoDto } from './create-nucleo.dto';

export class UpdateNucleoDto extends PartialType(CreateNucleoDto) {}
