import { Module } from '@nestjs/common';
import { ActaRoService } from './acta-ro.service';
import { ActaRoController } from './acta-ro.controller';

@Module({
  controllers: [ActaRoController],
  providers: [ActaRoService],
})
export class ActaRoModule {}
