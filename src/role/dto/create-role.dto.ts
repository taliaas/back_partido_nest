import { User } from 'src/user/entities/user.entity';

export class CreateRoleDto {
  id: number;

  name: string;

  users: User[];
}
