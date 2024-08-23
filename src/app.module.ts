import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BalanceModule } from './balance/balance.module';
import { ActaRoModule } from './acta-ro/acta-ro.module';
import { ActaCpModule } from './acta-cp/acta-cp.module';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphModule } from './graph/graph.module';
import { NucleoModule } from './nucleo/nucleo.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('localhost'),
        port: +configService.get('5432'),
        username: 'postgres',
        password: 'bdcomision',
        database: 'data',
        entities: [join(process.cwd(), 'dist/**/*.entity.js')], //Estas 2 líneas de acceso es para decir quien tiene acceso
        synchronize: true,
      }),
    }),
    AuthModule,
    BalanceModule,
    UserModule,
    ActaRoModule,
    ActaCpModule,
    ActaRoModule,
    GraphModule,
    NucleoModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
