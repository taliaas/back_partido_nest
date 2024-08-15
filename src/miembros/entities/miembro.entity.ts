import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Miembro {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
