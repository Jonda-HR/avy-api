import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GrowthGroupService } from './growth-group.service';
import { GrowthGroup } from './entities/growth-group.entity';
import { CreateGrowthGroupInput, UpdateGrowthGroupInput } from 'src/graphql';

@Resolver('GrowthGroup')
export class GrowthGroupResolver {
  constructor(private readonly growthGroupService: GrowthGroupService) {}

  @Query('growthGroups')
  public async growthGroups(): Promise<GrowthGroup[]> {
    return await this.growthGroupService.growthGroups();
  }

  @Query('growthGroupById')
  public async growthGroupById(@Args('id') id: number): Promise<GrowthGroup> {
    return await this.growthGroupService.growthGroupById(id);
  }

  @Mutation('createGrowthGroup')
  public async createGrowthGroup(
    @Args('input') input: CreateGrowthGroupInput,
  ): Promise<GrowthGroup> {
    return await this.growthGroupService.createGrowthGroup(input);
  }

  @Mutation('updateGrowthGroup')
  public async updateGrowthGroup(
    @Args('id') id: number,
    @Args('input') input: UpdateGrowthGroupInput,
  ): Promise<GrowthGroup> {
    return await this.growthGroupService.updateGrowthGroup(id, input);
  }

  @Mutation('removeGrowthGroup')
  public async removeGrowthGroup(@Args('id') id: number): Promise<GrowthGroup> {
    return await this.growthGroupService.removeGrowthGroup(id);
  }

  @Mutation('restoreGrowthGroup')
  public async restoreGrowthGroup(
    @Args('id') id: number,
  ): Promise<GrowthGroup> {
    return await this.growthGroupService.restoreGrowthGroup(id);
  }
}
