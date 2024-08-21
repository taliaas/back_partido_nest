import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class ActaRO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  nucleo: number;

  @Column({ type: 'integer' })
  missing: number;

  @Column({ type: 'integer' })
  present: number;

  @Column({ type: 'time' })
  hour: Timestamp;

  @Column({ type: 'date' })
  day: Date;

  @Column({ type: 'varchar', array: true })
  order: string;

  @Column({ type: 'varchar', array: true })
  members: string;

  @Column({ type: 'varchar' })
  development: string;

  @Column({ type: 'varchar', array: true })
  agreements: string;

  @Column({ type: 'int', default: 0 })
  cp: number;
}
