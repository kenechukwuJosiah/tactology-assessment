import { Module } from '@nestjs/common';
import { SubDepartmentService } from './sub-department.service';
import { SubDepartmentResolver } from './sub-department.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubDepartment } from './entities';
import { Department } from '../department/entities';
import { User } from '../user/entities';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubDepartment, Department, User])],
  providers: [SubDepartmentResolver, SubDepartmentService, UserService],
})
export class SubDepartmentModule {}
