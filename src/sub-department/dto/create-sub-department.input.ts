import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  departmentId: string;

  @Field()
  name: string;
}
