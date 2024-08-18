import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/balance/entities/balance.entity';
import { Graph } from './entities/graph.entity';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';
import { ActaCP } from 'src/acta-cp/entities/acta-cp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Balance, Graph, ActaRO, ActaCP])],
  controllers: [GraphController],
  providers: [GraphService],
  exports: [GraphService],
})
export class GraphModule {}
