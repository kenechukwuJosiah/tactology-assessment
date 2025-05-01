import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SubDepartment } from './sub-department.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => SubDepartment, (sub) => sub.department, { cascade: true })
  subDepartments: SubDepartment[];

  @ManyToOne(() => User, (user) => user.departments, { eager: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
