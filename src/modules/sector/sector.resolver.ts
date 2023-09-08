import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SectorService } from './sector.service';
import { Sector } from './entities/sector.entity';
import { CreateSectorInput, UpdateSectorInput } from 'src/graphql';

@Resolver('Sector')
export class SectorResolver {
  constructor(private readonly sectorService: SectorService) {}

  @Query('sectors')
  public async sectors(): Promise<Sector[]> {
    return await this.sectorService.sectors();
  }

  @Query('sectorById')
  public async sectorById(@Args('id') id: number): Promise<Sector> {
    return await this.sectorService.sectorById(id);
  }

  @Mutation('createSector')
  public async createSector(
    @Args('input') input: CreateSectorInput,
  ): Promise<Sector> {
    return await this.sectorService.createSector(input);
  }

  @Mutation('updateSector')
  public async updateSector(
    @Args('id') id: number,
    @Args('input') input: UpdateSectorInput,
  ): Promise<Sector> {
    return await this.sectorService.updateSector(id, input);
  }

  @Mutation('removeSector')
  public async removeSector(@Args('id') id: number): Promise<Sector> {
    return await this.sectorService.removeSector(id);
  }

  @Mutation('restoreSector')
  public async restoreSector(@Args('id') id: number): Promise<Sector> {
    return await this.sectorService.restoreSector(id);
  }
}
