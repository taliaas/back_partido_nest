import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { NucleoService } from 'src/nucleo/nucleo.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private nucleoService: NucleoService, 
  ) {}

  //(Nuevo) Esta funcion busca el nombre del usuario en la tabla nucleo, si ese nombre no pertenece a ningun nuclo no se puede agregar a la base de datos. 
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verifica si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new NotFoundException('El usuario ya existe.');
    }

    // Verifica si el nombre del usuario está en algún núcleo
    await this.nucleoService.buscarMiembro(createUserDto.name);

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

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
