import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Graph {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  core: number;

  @Column({ type: 'integer' })
  anno: number;

  @Column({ type: 'integer', array: true })
  order: number[];

  @Column({ type: 'integer', array: true })
  agreem: number[];

  @Column({ type: 'integer', array: true })
  participant: number[];
}
