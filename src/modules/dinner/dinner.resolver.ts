import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DinnerService } from './dinner.service';
import { Dinner } from './entities/dinner.entity';
import { CreateDinnerInput, UpdateDinnerInput } from 'src/graphql';

@Resolver('Dinner')
export class DinnerResolver {
  constructor(private readonly dinnerService: DinnerService) {}

  @Query('dinners')
  public async dinners(): Promise<Dinner[]> {
    return await this.dinnerService.dinners();
  }

  @Query('dinnerById')
  public async dinnerById(@Args('id') id: number): Promise<Dinner> {
    return await this.dinnerService.dinnerById(id);
  }

  @Mutation('createDinner')
  public async createDinner(
    @Args('input') input: CreateDinnerInput,
  ): Promise<Dinner> {
    return await this.dinnerService.createDinner(input);
  }

  @Mutation('updateDinner')
  public async updateDinner(
    @Args('id') id: number,
    @Args('input') input: UpdateDinnerInput,
  ): Promise<Dinner> {
    return await this.dinnerService.updateDinner(id, input);
  }

  @Mutation('removeDinner')
  public async removeDinner(@Args('id') id: number): Promise<Dinner> {
    return await this.dinnerService.removeDinner(id);
  }

  @Mutation('restoreDinner')
  public async restoreDinner(@Args('id') id: number): Promise<Dinner> {
    return await this.dinnerService.restoreDinner(id);
  }
}
