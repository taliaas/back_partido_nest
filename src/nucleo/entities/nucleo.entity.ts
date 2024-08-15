import { Miembro } from 'src/miembros/entities/miembro.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nucleo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({})
  list: Miembro[];
}
