import { Module } from '@nestjs/common';
import { SubDepartmentService } from './sub-department.service';
import { SubDepartmentResolver } from './sub-department.resolver';

@Module({
  providers: [SubDepartmentResolver, SubDepartmentService],
})
export class SubDepartmentModule {}
