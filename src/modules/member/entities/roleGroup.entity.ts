import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class RoleGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  roleGroupName: string;

  @OneToMany(() => Member, (member) => member.roleGroup, { lazy: true })
  members: Member[];
}
