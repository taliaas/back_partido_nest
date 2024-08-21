import { IsArray, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
export class CreateNucleoDto {
  @IsString()
  name: string;

  @IsArray()
  users: User[];
}
