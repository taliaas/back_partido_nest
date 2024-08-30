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
  ) {}
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
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.findOneByName(username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const validPassword = await this.verifyPassword(password, user.password);
      if (!validPassword) {
        console.log(validPassword);
        throw new UnauthorizedException('The Password provided is incorrect');
      }
      const payload = {
        name: user.name,
        role: user.role,
      };
      // Use this.jwtService.sign for signing the tokens
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

      return {
        access_token: accessToken,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  //cuando se olvida la contrasenna y la recupera
  /* async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    try {
      // Obtener el usuario del sistema
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return { message: 'Usuario no encontrado' };
      }

      // Verificar la contraseña antigua
      const isValidOldPassword = await bcrypt.compare(
        oldPassword,
        user.password,
      );

      if (!isValidOldPassword) {
        return { message: 'Contraseña antigua incorrecta' };
      }

      // Encriptar la nueva contraseña
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // Actualizar la contraseña en la base de datos
      user.password = hashedNewPassword;
      await this.userRepository.save(user);

      // Generar un nuevo token JWT
      const payload = { sub: user.id };
      const token = this.jwtService.sign(payload);

      return { message: 'Contraseña actualizada correctamente', token };
    } catch (error) {
      console.error(error);
      return { message: 'Ocurrió un error al actualizar la contraseña' };
    }
  }*/
}
