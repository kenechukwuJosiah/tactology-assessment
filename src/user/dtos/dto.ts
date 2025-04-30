import { IsString } from 'class-validator';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  username?: string;

  @Field({ nullable: true })
  @IsString()
  fullName?: string;
}

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  fullName: string;
}
