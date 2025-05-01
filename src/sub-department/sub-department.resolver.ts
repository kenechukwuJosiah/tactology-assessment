import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubDepartmentService } from './sub-department.service';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';

@UseGuards(AuthGuard)
@Resolver(() => SubDepartment)
export class SubDepartmentResolver {
  constructor(private readonly subDepartmentService: SubDepartmentService) {}

  @Mutation(() => SubDepartment)
  createSubDepartment(
    @Args('createSubDepartmentInput')
    createSubDepartmentInput: CreateSubDepartmentInput,
  ) {
    return this.subDepartmentService.create(createSubDepartmentInput);
  }

  @Query(() => [SubDepartment], { name: 'subDepartment' })
  findAll() {
    return this.subDepartmentService.findAll();
  }

  @Query(() => SubDepartment, { name: 'subDepartment' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.subDepartmentService.findOne(id);
  }

  @Mutation(() => SubDepartment)
  updateSubDepartment(
    @Args('updateSubDepartmentInput')
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ) {
    return this.subDepartmentService.update(
      updateSubDepartmentInput.id,
      updateSubDepartmentInput,
    );
  }

  @Mutation(() => SubDepartment)
  removeSubDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.subDepartmentService.remove(id);
  }
}
