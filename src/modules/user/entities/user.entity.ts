import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleUser } from './roleUser.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  userName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: 1 })
  roleUserId: number;

  @ManyToOne(() => RoleUser, (roleUser) => roleUser.users, { lazy: true })
  roleUser: RoleUser;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
