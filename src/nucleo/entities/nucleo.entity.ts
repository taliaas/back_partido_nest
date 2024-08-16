import { Miembro } from 'src/miembros/entities/miembro.entity';
import { Column, Entity, PrimaryGeneratedColumn,PrimaryColumn } from 'typeorm';

@Entity()
export class Nucleo {
  @PrimaryColumn()
  id_nucleo: number;

  @Column("simple-array")
  list: string[];
}
