import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.existUser(createUserDto.email);
    if (user === null) {
      const encrypted = this.calculateSha256(createUserDto.password);

      const user = this.userRepository.create({
        ...createUserDto,
        password: encrypted,
      });
      return await this.userRepository.save(user);
    }
  }
  async existUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
  calculateSha256(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async update(idUser: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(idUser);
    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(idUser: number) {
    const user = await this.findOne(idUser);
    if (!user) {
      throw new NotFoundException();
    }
    return await this.userRepository.remove(user);
  }
}
