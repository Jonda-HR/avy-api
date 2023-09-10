import { GrowthGroup } from '../../growth-group/entities/growth-group.entity';
import { Dinner } from '../../dinner/entities/dinner.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  code: string;

  @Column({ nullable: false, default: false })
  isPaid: boolean;

  @Column({ nullable: false })
  dinnerId: number;

  @ManyToOne(() => Dinner, (dinner) => dinner.tikets, { lazy: true })
  dinner: Dinner;

  @Column({ nullable: false })
  growthGroupId: number;

  @ManyToOne(() => GrowthGroup, (growthGroup) => growthGroup.tikets, {
    lazy: true,
  })
  growthGroup: GrowthGroup;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
