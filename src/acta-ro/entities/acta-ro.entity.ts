import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class ActaRO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  nucleo: number;

  @Column({ type: 'integer' })
  area: number;

  @Column({ type: 'integer' })
  missing: number;

  @Column({ type: 'integer' })
  present: number;

  @Column({ type: 'time' })
  hour: Timestamp;

  @Column({ type: 'date' })
  day: Date;

  @Column({ type: 'varchar', length: 255 })
  order: string;

  @Column({ type: 'varchar' })
  development: string;

  @Column({ type: 'varchar' })
  agreements: string;
}
