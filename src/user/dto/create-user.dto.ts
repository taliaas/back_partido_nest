import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  name: string;

  email: string;

  password: string;

  role: Role[];
}
