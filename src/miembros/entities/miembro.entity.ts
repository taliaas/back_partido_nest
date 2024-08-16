import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Miembro {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  id_nucleo: number;

  @Column()
  name: string;
}
