import { GrowthGroup } from '../../growth-group/entities/growth-group.entity';
import { Member } from '../../member/entities/member.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Sector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  sectorName: string;

  @Column({ nullable: false })
  supervisorId: number;

  @OneToOne(() => Member, (member) => member.sector, { lazy: true })
  @JoinColumn()
  supervisor: Member;

  @OneToMany(() => GrowthGroup, (growthGroup) => growthGroup.sector, {
    lazy: true,
  })
  growthGroups: GrowthGroup[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
