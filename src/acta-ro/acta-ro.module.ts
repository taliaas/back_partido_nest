import { Module } from '@nestjs/common';
import { ActaRoService } from './acta-ro.service';
import { ActaRoController } from './acta-ro.controller';
import { ActaRO } from './entities/acta-ro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceModule } from 'src/balance/balance.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ActaRO]),
    BalanceModule,  // Importa BalanceModule aquí
  ],
  controllers: [ActaRoController],
  providers: [ActaRoService],
  exports: [ActaRoService],
})
export class ActaRoModule {}