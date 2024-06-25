import { PartialType } from '@nestjs/mapped-types';
import { CreateActaCpDto } from './create-acta-cp.dto';

export class UpdateActaCpDto extends PartialType(CreateActaCpDto) {}
