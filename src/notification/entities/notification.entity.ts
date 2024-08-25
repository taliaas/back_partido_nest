import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  message: string;

  @Column({ type: 'integer' })
  userID: number;

  @Column({ type: 'integer', default: '30' })
  dateDelete: number;
}
