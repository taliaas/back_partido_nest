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

    const saltRounds = 10;
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

  async findOneByName(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { name },
    });
  }
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  // pasar contrasenna y que se hashee
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async updatePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    try {
      // Buscar al usuario por ID
      const user = await this.findOne(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      console.log(user.name);
      // Comparar la contraseña antigua con la almacenada
      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        user.password,
      );
      console.log(user.password, oldPassword);
      if (!isOldPasswordValid) {
        console.log('error, contrasenna incorrecta');
        throw new Error('Contraseña antigua incorrecta');
      }
      console.log(user.name);
      // Hash de la nueva contraseña
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña del usuario
      Object.assign(user, { password: hashedNewPassword });
      return await this.userRepository.save(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(idUser: number) {
    const user = await this.findOne(idUser);
    if (!user) {
      throw new NotFoundException();
    }
    return await this.userRepository.remove(user);
  }
}
