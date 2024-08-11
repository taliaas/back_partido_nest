import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { BalanceModule } from './balance/balance.module';
import { ActaRoModule } from './acta-ro/acta-ro.module';
import { ActaCpModule } from './acta-cp/acta-cp.module';

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
        password: 'citizenfour',
        database: 'proyectoweb',
        entities: [join(process.cwd(), 'dist/**/*.entity.js')], //Estas 2 líneas de acceso es para decir quien tiene acceso
        synchronize: true,
      }),
    }),
    UserModule,
    RoleModule,
    AuthModule,
    BalanceModule,
    ActaRoModule,
    ActaCpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
