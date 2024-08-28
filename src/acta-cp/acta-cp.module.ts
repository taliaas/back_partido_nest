import { Module } from '@nestjs/common';
import { ActaCpService } from './acta-cp.service';
import { ActaCpController } from './acta-cp.controller';
import { ActaCP } from './entities/acta-cp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';
import { ActaRoModule } from 'src/acta-ro/acta-ro.module';
import { BalanceModule } from 'src/balance/balance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActaCP, ActaRO]),
    ActaRoModule,
    BalanceModule,
  ],
  controllers: [ActaCpController],
  providers: [ActaCpService],
})
export class ActaCpModule {}
