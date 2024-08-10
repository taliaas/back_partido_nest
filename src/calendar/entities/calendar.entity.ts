import { Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

export class Calendar {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  nucleo: number;

  @Column({ type: 'integer' })
  area: number;

  @Column({ type: 'time' })
  hour: Timestamp;

  @Column({ type: 'date' })
  day: Date;
}
