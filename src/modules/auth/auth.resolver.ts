import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse, SingUpInput } from 'src/graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Query('revalidate')
  // public async revalidate() {
  //   return await this.authService.revalidate();
  // }

  // @Mutation('singIn')
  // public async singIn() {
  //   return await this.authService.singIn();
  // }

  @Mutation('singUp')
  public async singUp(
    @Args('input') input: SingUpInput,
  ): Promise<AuthResponse> {
    return await this.authService.singUp(input);
  }
}
