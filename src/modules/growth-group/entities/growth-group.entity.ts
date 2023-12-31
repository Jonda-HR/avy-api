import { Ticket } from '../../ticket/entities/ticket.entity';
import { Sector } from '../../sector/entities/sector.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class GrowthGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  growthGroupName: string;

  @Column({ nullable: true })
  headquarters: string;

  @Column({ nullable: false })
  sectorId: number;

  @ManyToOne(() => Sector, (sector) => sector.growthGroups, { lazy: true })
  sector: Sector;

  @OneToMany(() => Ticket, (ticket) => ticket.growthGroup, { lazy: true })
  tikets: Ticket[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
