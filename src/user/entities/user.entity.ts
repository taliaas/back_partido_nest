import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 12, unique: true, nullable: true })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role' })
  role: Role;
}
