import { Role } from 'src/common/enums/rol.enum';
import { Nucleo } from 'src/nucleo/entities/nucleo.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @ManyToOne(() => Nucleo, (nucleo) => nucleo.usuarios)
  nucleo: Nucleo;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;
}
