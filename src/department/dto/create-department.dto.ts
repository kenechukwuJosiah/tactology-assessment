import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SubDepartmentInput {
  @Field()
  @Length(2)
  name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field()
  @Length(2)
  name: string;

  @Field(() => [SubDepartmentInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SubDepartmentInput)
  subDepartments?: SubDepartmentInput[];
}
