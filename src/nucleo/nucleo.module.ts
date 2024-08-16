import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NucleoService } from './nucleo.service';
import { Nucleo } from './entities/nucleo.entity';
import { NucleoController } from './nucleo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Nucleo])],
  providers: [NucleoService],
  controllers: [NucleoController],
  exports: [NucleoService], // Exporta NucleoService para que pueda ser usado en otros módulos
})
export class NucleoModule {}
