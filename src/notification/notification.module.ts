import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { User } from 'src/user/entities/user.entity';
import { ActaRO } from 'src/acta-ro/entities/acta-ro.entity';
import { ActaCP } from 'src/acta-cp/entities/acta-cp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, ActaRO, ActaCP])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
