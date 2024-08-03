import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'balance' })
export class Balance {
  @PrimaryGeneratedColumn('increment')
  idBal: number;

  @Column({ type: 'integer' })
  core: number;

  @Column({ unique: true, type: 'integer' })
  minutes: number;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: false, type: 'integer' })
  participants: number;

  @Column({ type: 'integer' })
  agreements: number;

  @Column({ type: 'integer' })
  crecim: number;

  @Column({ type: 'integer' })
  cp: number;

  @Column({ type: 'integer' })
  agreements_cp: number;

  @Column({ type: 'integer' })
  month: number;
}
