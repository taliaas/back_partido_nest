import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    //Verificar q no exista ya el usuario
    const name = await this.existUser(createUserDto.email);
    if (name === null) {
      //encriptas contraseña con sha-256
      const encrypted = this.calculateMd5(createUserDto.password);

      const user = this.userRepository.create({
        ...createUserDto,
        password: encrypted,
      });
      return await this.userRepository.save(user);
    }
    return '';
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
  //hacer funcion para autenticar
  async authenticate(user: User) {
    //buscar entre todos los usuarios el q coincida en email
    const userNew = await this.existUser(user.email);
    if (userNew !== null) {
      //si coincide obtener su contraseña desencriptar y comparas con la contraseña que te pase
      const pass = this.calculateMd5(user.password);
      if (pass == userNew.password) {
        //si son iguales contraseñas ent devolver true
        return user;
      }
    }
    throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
  }

  calculateMd5(input: string): string {
    const hash = crypto.createHash('md5');
    hash.update(input);
    return hash.digest('hex');
  }

  async existUser(email: string) {
    console.log(email);
    const user = await this.userRepository.findOne({
      where: { email },
    });
    console.log(user);
    return user;
  }
}
