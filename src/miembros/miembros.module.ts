import { Module } from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import { MiembrosController } from './miembros.controller';
import { Miembro } from './entities/miembro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Miembro])],
  controllers: [MiembrosController],
  providers: [MiembrosService, AuthService],
  exports: [MiembrosService],
})
export class MiembrosModule {}
