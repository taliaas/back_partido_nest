import { Module } from '@nestjs/common';
import { ActaRoService } from './acta-ro.service';
import { ActaRoController } from './acta-ro.controller';
import { ActaRO } from './entities/acta-ro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActaRO])],
  controllers: [ActaRoController],
  providers: [ActaRoService],
  exports: [ActaRoService],
})
export class ActaRoModule {}
