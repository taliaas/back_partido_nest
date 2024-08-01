import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity'; 
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
		private jwtService: JwtService,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) { }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async authentication(name: string, password: string):{

		const user = await this.userRepository.findOne({ where: { name: name } });
		if (!user) {
			throw new UnauthorizedException('User not found');
		}
		console.log(`Password was received: ${password}, Password was stored: ${user.password}`); 

		const validPassword = this.verifyPassword(password, user.password);
		if (!validPassword) {
			throw new UnauthorizedException('The Password provided is incorrect');
		}
		const payload = {
			name: user.name,
			role: user.role,
		};
		const secretKey = process.env.JWT_SECRET;
		const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

		return {
			access_token: this.jwtService.sign(payload),
			refresh_token: this.jwtService.sign(payload, {
				secret: process.env.REFRESH_SECRET,
				expiresIn: '7d',
			}),
		};
	}

	private verifyPassword(plainPassword: string, hashedPassword: string): boolean {
		
		if (typeof plainPassword !== 'string' || typeof hashedPassword !== 'string') {
			throw new Error('The values ​​entered must be strings');
		}
		const hash = crypto.createHash('md5').update(plainPassword).digest('hex');
		return hash === hashedPassword;
	}
  
}
