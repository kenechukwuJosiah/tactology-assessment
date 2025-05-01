import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubDepartmentService } from './sub-department.service';
import {
  CreateSubDepartmentInput,
  SubDepartmentOutput,
} from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';

@UseGuards(AuthGuard)
@Resolver(() => SubDepartmentOutput)
export class SubDepartmentResolver {
  constructor(private readonly subDepartmentService: SubDepartmentService) {}

  @Mutation(() => SubDepartmentOutput)
  createSubDepartment(
    @Args('createSubDepartmentInput')
    createSubDepartmentInput: CreateSubDepartmentInput,
  ) {
    return this.subDepartmentService.create(createSubDepartmentInput);
  }

  @Query(() => [SubDepartmentOutput])
  listSubDepartment() {
    return this.subDepartmentService.findAll();
  }

  @Query(() => SubDepartmentOutput)
  findSubDepartment(@Args('id', { type: () => String }) id: string) {
    return this.subDepartmentService.findOne(id);
  }

  @Mutation(() => SubDepartmentOutput)
  updateSubDepartment(
    @Args('updateSubDepartmentInput')
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ) {
    return this.subDepartmentService.update(
      updateSubDepartmentInput.id,
      updateSubDepartmentInput,
    );
  }

  @Mutation(() => Boolean)
  deleteSubDepartment(@Args('id', { type: () => String }) id: number) {
    return this.subDepartmentService.remove(id);
  }
}
