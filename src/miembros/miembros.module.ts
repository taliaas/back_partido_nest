import { Module } from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import { MiembrosController } from './miembros.controller';

@Module({
  controllers: [MiembrosController],
  providers: [MiembrosService],
})
export class MiembrosModule {}
