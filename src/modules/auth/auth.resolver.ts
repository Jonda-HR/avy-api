import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  AuthResponse,
  SignInInput,
  SignUpInput,
  validRoles,
} from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('revalidate')
  @UseGuards(JwtAuthGuard)
  public revalidateToken(
    @CurrentUser([validRoles.admin]) user: User,
  ): AuthResponse {
    return this.authService.revalidateToken(user);
  }

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
