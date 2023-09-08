import { Member } from '../../member/entities/member.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Sector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sectorName: string;

  @Column({ nullable: false })
  supervisorId: number;

  @OneToOne(() => Member, (member) => member.sector, { lazy: true })
  @JoinColumn()
  supervisor: Member;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
