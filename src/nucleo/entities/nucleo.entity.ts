import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nucleo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', array: true })
  integrantes: string[];
}
