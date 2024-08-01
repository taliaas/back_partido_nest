import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { User } from "src/user/entities/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forFeature([User]),
		PassportModule,
		HttpModule.registerAsync({
			useFactory: () => ({
				timeout: 5000, 
			}),
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: 3600,
			},
		}),
	],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
