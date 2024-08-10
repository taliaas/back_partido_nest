import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (
      typeof plainPassword !== 'string' ||
      typeof hashedPassword !== 'string'
    ) {
      throw new Error('The values entered must be strings');
    }
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
  async findOneByName(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { name } });
  }

  async authentication(
    username: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const user = await this.findOneByName(username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const validPassword = await this.verifyPassword(password, user.password);
      if (!validPassword) {
        throw new UnauthorizedException('The Password provided is incorrect');
      }

      const payload = {
        name: user.name,
        role: user.role,
      };

      // Use this.jwtService.sign for signing the tokens
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
