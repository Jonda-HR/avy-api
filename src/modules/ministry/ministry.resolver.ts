import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MinistryService } from './ministry.service';
import { Ministry } from './entities/ministry.entity';
import { CreateMinistryInput, UpdateMinistryInput } from 'src/graphql';

@Resolver('Ministry')
export class MinistryResolver {
  constructor(private readonly ministryService: MinistryService) {}

  @Query('ministries')
  public async ministrys(): Promise<Ministry[]> {
    return await this.ministryService.ministries();
  }

  @Query('ministryById')
  public async ministryById(@Args('id') id: number): Promise<Ministry> {
    return await this.ministryService.ministryById(id);
  }

  @Mutation('createMinistry')
  public async createMinistry(
    @Args('input') input: CreateMinistryInput,
  ): Promise<Ministry> {
    return await this.ministryService.createMinistry(input);
  }

  @Mutation('updateMinistry')
  public async updateMinistry(
    @Args('id') id: number,
    @Args('input') input: UpdateMinistryInput,
  ): Promise<Ministry> {
    return await this.ministryService.updateMinistry(id, input);
  }

  @Mutation('removeMinistry')
  public async removeMinistry(@Args('id') id: number): Promise<Ministry> {
    return await this.ministryService.removeMinistry(id);
  }

  @Mutation('restoreMinistry')
  public async restoreMinistry(@Args('id') id: number): Promise<Ministry> {
    return await this.ministryService.restoreMinistry(id);
  }
}
