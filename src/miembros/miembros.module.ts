import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiembrosService } from './miembros.service';
import { MiembrosController } from './miembros.controller';
import { Miembro } from './entities/miembro.entity';
import { NucleoModule } from '../nucleo/nucleo.module'; // Asegúrate de que la ruta sea correcta

@Module({
  imports: [
    TypeOrmModule.forFeature([Miembro]),
    NucleoModule, // Asegúrate de importar el NucleoModule
  ],
  controllers: [MiembrosController],
  providers: [MiembrosService],
  exports: [MiembrosService],
})
export class MiembrosModule {}
