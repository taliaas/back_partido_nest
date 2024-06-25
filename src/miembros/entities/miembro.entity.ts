import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Miembro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  apellidos: string;

  @Column({ type: 'varchar', length: 255 })
  cargo: string;

  @Column({ type: 'integer' })
  nucleo: number;

  @Column({ type: 'integer' })
  area: number;
}
