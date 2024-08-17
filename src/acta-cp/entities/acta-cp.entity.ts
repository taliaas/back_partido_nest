import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class ActaCP {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  missing: number;

  @Column({ type: 'integer' })
  present: number;

  @Column({ type: 'time' })
  hour: Timestamp;

  @Column({ type: 'date' })
  day: Date;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'varchar' })
  topic: string;

  @Column({ type: 'varchar' })
  development: string;

  @Column({ type: 'varchar' })
  agreements: string;

  @Column({ type: 'integer' })
  idRO: number;
}
