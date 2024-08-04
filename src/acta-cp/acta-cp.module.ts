import { Module } from '@nestjs/common';
import { ActaCpService } from './acta-cp.service';
import { ActaCpController } from './acta-cp.controller';
import { ActaCP } from './entities/acta-cp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActaCP])],
  controllers: [ActaCpController],
  providers: [ActaCpService],
})
export class ActaCpModule {}
