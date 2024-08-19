import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { Balance } from './entities/balance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';
import { ActaCP } from 'src/acta-cp/entities/acta-cp.entity';
import { GraphModule } from 'src/graph/graph.module';

@Module({
  imports: [TypeOrmModule.forFeature([Balance, ActaRO, ActaCP]), GraphModule],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
