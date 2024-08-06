import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { Balance } from './entities/balance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';
import { ActaCP } from 'src/acta-cp/entities/acta-cp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Balance, ActaRO, ActaCP])],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
