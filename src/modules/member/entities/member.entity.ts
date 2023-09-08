import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleGroup } from './roleGroup.entity';
import { RoleMinistry } from './roleMinistry.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column()
  identityNumber: string;

  @Column()
  birthday: Date;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: false })
  roleGroupId: number;

  @ManyToOne(() => RoleGroup, (roleGroup) => roleGroup.members, {
    lazy: true,
  })
  roleGroup: RoleGroup;

  @Column({ nullable: false })
  roleMinistryId: number;

  @ManyToOne(() => RoleMinistry, (roleMinistry) => roleMinistry.members, {
    lazy: true,
  })
  roleMinistry: RoleMinistry;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
