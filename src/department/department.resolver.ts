import { Resolver } from '@nestjs/graphql';
import { DepartmentService } from './department.service';

@Resolver()
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}
}
