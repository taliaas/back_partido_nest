import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;
}
