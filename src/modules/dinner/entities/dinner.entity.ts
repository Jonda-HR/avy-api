import { Ticket } from '../../ticket/entities/ticket.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Dinner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  dinnerName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  raisedMoney: number;

  @OneToMany(() => Ticket, (ticket) => ticket.dinner, {
    lazy: true,
  })
  tikets: Ticket[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
