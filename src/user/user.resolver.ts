import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput, UserOutput } from './dtos';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput, { name: 'createUser' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserOutput> {
    if (!createUserInput.username || createUserInput.username.trim() === '') {
      throw new Error('Username is required and cannot be empty.');
    }

    const newUser = await this.userService.createUser(createUserInput);

    return {
      id: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
    };
  }

  @Mutation(() => UserOutput, { name: 'updateProfile' })
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateUserInput,
    @Args('userId', { nullable: false }) userId: string,
  ): Promise<UserOutput> {
    const updatedUser = await this.userService.updateUser(
      userId,
      updateProfileInput,
    );

    return {
      id: userId,
      username: updatedUser.username,
      fullName: updatedUser.fullName,
    };
  }
}
