import { Department } from '../../department/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

type StatusType = 'active' | 'inactive' | 'suspended';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ default: false })
  online: boolean;

  @OneToMany(() => Department, (department) => department.createdBy, {
    cascade: true,
  })
  departments: Department[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ default: false })
  deleted: boolean;

  @Column({ default: 'active' })
  status: StatusType;

  @Column({ nullable: true })
  createdBy: string;
}
