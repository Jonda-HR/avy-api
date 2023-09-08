import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RoleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  roleUserName: string;

  @OneToMany(() => User, (user) => user.roleUser, { lazy: true })
  users: User[];
}
