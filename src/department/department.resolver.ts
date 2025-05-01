import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
// import { Department } from './entities';
import { CreateDepartmentInput, DepartmentOutput } from './dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';

@UseGuards(AuthGuard)
@Resolver(() => DepartmentOutput)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Mutation(() => DepartmentOutput)
  createDepartment(
    @Args('input') input: CreateDepartmentInput,
    @Context('req') req,
  ) {
    const userId = req.user.id;
    return this.departmentService.create(input, userId);
  }

  @Query(() => [DepartmentOutput])
  getDepartments(@Context('req') req) {
    const userId = req.user.id;
    return this.departmentService.findAll(userId);
  }

  @Mutation(() => DepartmentOutput)
  updateDepartment(@Args('id') id: string, @Args('name') name: string) {
    if (!id || !name) {
      throw new Error('Both id and name are required.');
    }
    return this.departmentService.update(id, name);
  }

  @Mutation(() => Boolean)
  deleteDepartment(@Args('id') id: string) {
    return this.departmentService.delete(id);
  }
}
