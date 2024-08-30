import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  details: string;

  @Column({ type: 'integer' })
  core: number;

  @Column({ type: 'date' })
  fecha: Date;
}
