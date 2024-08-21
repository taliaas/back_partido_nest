import { IsEmail, IsNotEmpty } from 'class-validator';
import { Nucleo } from 'src/nucleo/entities/nucleo.entity';
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  nucleo: Nucleo;

  @IsNotEmpty()
  password: string;
}
