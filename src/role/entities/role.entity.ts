import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
