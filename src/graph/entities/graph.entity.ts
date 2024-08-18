import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Graph {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  core: number;

  @Column({ type: 'integer' })
  anno: number;

  @Column({ type: 'varchar' })
  indicador: string;

  @Column({ type: 'integer' })
  valores: number[];
}
