import { Module } from '@nestjs/common';
import { ActaCpService } from './acta-cp.service';
import { ActaCpController } from './acta-cp.controller';

@Module({
  controllers: [ActaCpController],
  providers: [ActaCpService],
})
export class ActaCpModule {}
