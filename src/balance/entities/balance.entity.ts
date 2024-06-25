import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  nucleo: number;

  @Column({ type: 'boolean', default: false }) //crecimiento
  growth: boolean;

  @Column({ type: 'boolean', default: false })
  cp: boolean;

  @Column({ type: 'integer' })
  order_of_day: number;

  @Column({ type: 'integer' })
  participants: number;

  @Column({ type: 'integer' })
  agreements: number;
}
