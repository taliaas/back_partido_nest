import { Module } from '@nestjs/common';
import { NucleoService } from './nucleo.service';
import { NucleoController } from './nucleo.controller';
import { Nucleo } from './entities/nucleo.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Nucleo])],
  controllers: [NucleoController],
  exports: [NucleoService],
  providers: [NucleoService],
})
export class NucleoModule {}
