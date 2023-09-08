import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from 'src/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  public async users(): Promise<User[]> {
    return await this.userService.users();
  }

  @Query('userById')
  public async userById(@Args('id') id: number): Promise<User> {
    return await this.userService.userById(id);
  }

  @Mutation('createUser')
  public async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(input);
  }

  @Mutation('updateUser')
  public async updateUser(
    @Args('id') id: number,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(id, input);
  }

  @Mutation('removeUser')
  public async removeUser(@Args('id') id: number): Promise<User> {
    return await this.userService.removeUser(id);
  }

  @Mutation('restoreUser')
  public async restoreUser(@Args('id') id: number): Promise<User> {
    return await this.userService.restoreUser(id);
  }
}
