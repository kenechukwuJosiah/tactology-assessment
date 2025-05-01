import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  departmentId: string;

  @Field()
  name: string;
}

@ObjectType()
export class SubDepartmentOutput {
  @Field()
  id: string;

  @Field()
  name: string;
}
