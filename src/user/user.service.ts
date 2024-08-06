import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verifica si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const exist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser || exist) {
      throw new NotFoundException('El usuario ya existe.');
    }

    // Suponiendo que createUserDto es un objeto que contiene la propiedad password
    const saltRounds = 10; // Número de rondas para el hashing, aumentar para mayor seguridad pero menor rendimiento
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // Crea el nuevo usuario con la contraseña encriptada
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Guarda el nuevo usuario en la base de datos
    await this.userRepository.save(newUser);

    return newUser;
  }
  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
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
