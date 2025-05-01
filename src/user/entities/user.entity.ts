import { SubDepartment } from '../../sub-department/entities';
import { Department } from '../../department/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

type StatusType = 'active' | 'inactive' | 'suspended';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ default: false, type: 'boolean' })
  online: boolean;

  @OneToMany(() => Department, (department) => department.createdBy, {
    cascade: true,
  })
  departments: Department[];

  @OneToMany(() => Department, (department) => department.createdBy, {
    cascade: true,
  })
  subDepartments: SubDepartment[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ default: 'active', type: 'text' })
  status: StatusType;

  @Column({ nullable: true, type: 'varchar' })
  createdBy: string;
}
