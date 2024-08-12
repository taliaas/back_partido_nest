<<<<<<< HEAD
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
=======
import { Role } from 'src/common/enums/rol.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
>>>>>>> prueba-role

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

<<<<<<< HEAD
  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role' })
=======
  @Column({ type: 'enum', default: Role.USER, enum: Role })
>>>>>>> prueba-role
  role: Role;
}
