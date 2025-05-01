import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const { access_token } = await this.authService.login(username, password);
    return access_token;
  }
}
