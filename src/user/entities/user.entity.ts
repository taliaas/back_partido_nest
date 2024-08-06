import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ type: 'varchar', length: 12, unique: true, nullable: true })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @ManyToMany(() => Role, (role) => role.name)
  roles: Role[];
}
