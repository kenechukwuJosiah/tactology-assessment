import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities';
import { CreateDepartmentInput } from './dto';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(@Args('input') input: CreateDepartmentInput) {
    return this.departmentService.create(input);
  }

  @Query(() => [Department])
  getDepartments() {
    return this.departmentService.findAll();
  }

  @Mutation(() => Department)
  updateDepartment(@Args('id') id: string, @Args('name') name: string) {
    return this.departmentService.update(id, name);
  }

  @Mutation(() => Boolean)
  deleteDepartment(@Args('id') id: string) {
    return this.departmentService.delete(id);
  }
}
