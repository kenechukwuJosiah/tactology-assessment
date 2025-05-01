import { CreateSubDepartmentInput } from './create-sub-department.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubDepartmentInput extends PartialType(
  CreateSubDepartmentInput,
) {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  departmentId?: string;
}
