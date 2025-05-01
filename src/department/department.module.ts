import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { Department, SubDepartment } from './entities';
import { UserService } from '../user/user.service';
import { User } from '../user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment, User])],
  providers: [DepartmentService, DepartmentResolver, UserService],
})
export class DepartmentModule {}
