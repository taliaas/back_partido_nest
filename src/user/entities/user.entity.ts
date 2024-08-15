import { Role } from 'src/common/enums/rol.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'integer' }) //hacer un JOIN
  nucleo: number;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;
}
