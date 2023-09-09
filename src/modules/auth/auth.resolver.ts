import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse, SignInInput, SignUpInput } from 'src/graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Query('revalidate')
  // public async revalidate() {
  //   return await this.authService.revalidate();
  // }

  @Mutation('signIn')
  public async signIn(
    @Args('input') input: SignInInput,
  ): Promise<AuthResponse> {
    return await this.authService.signIn(input);
  }

  @Mutation('signUp')
  public async signUp(
    @Args('input') input: SignUpInput,
  ): Promise<AuthResponse> {
    return await this.authService.signUp(input);
  }
}
