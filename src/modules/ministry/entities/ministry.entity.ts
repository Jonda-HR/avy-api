import { Member } from '../../member/entities/member.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Ministry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  ministryName: string;

  @ManyToMany(() => Member, (member) => member.ministries, { lazy: true })
  members: Member[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
