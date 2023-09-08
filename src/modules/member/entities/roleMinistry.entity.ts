import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class RoleMinistry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  roleMinistryName: string;

  @OneToMany(() => Member, (member) => member.roleMinistry, { lazy: true })
  members: Member[];
}
