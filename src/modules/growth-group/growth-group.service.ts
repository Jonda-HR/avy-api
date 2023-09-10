import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrowthGroup } from './entities/growth-group.entity';
import { Repository } from 'typeorm';
import { CreateGrowthGroupInput, UpdateGrowthGroupInput } from 'src/graphql';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';

@Injectable()
export class GrowthGroupService {
  constructor(
    @InjectRepository(GrowthGroup)
    private growthGroupRepository: Repository<GrowthGroup>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  public async growthGroups(): Promise<GrowthGroup[]> {
    try {
      return await this.growthGroupRepository.find({
        order: { growthGroupName: 'ASC' },
      });
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while getting the growthGroups.',
        error.stack,
        'GrowthGroupService/growthGroups',
      );
    }
  }

  public async createGrowthGroup(
    input: CreateGrowthGroupInput,
  ): Promise<GrowthGroup> {
    try {
      const newGrowthGroup = this.growthGroupRepository.create(input);
      return await this.growthGroupRepository.save(newGrowthGroup);
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while creating a new growthGroup.',
        error.stack,
        'GrowthGroupService/createGrowthGroup',
      );
    }
  }

  public async growthGroupById(id: number): Promise<GrowthGroup> {
    try {
      return await this.growthGroupRepository.findOneBy({ id });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while obtaining the growthGroup with ID: ${id}`,
        error.stack,
        'GrowthGroupService/growthGroupById',
      );
    }
  }

  public async updateGrowthGroup(
    id: number,
    input: UpdateGrowthGroupInput,
  ): Promise<GrowthGroup> {
    try {
      await this.growthGroupRepository.update(id, input);
      return await this.growthGroupById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while updating growthGroup with ID: ${id}`,
        error.stack,
        'GrowthGroupService/updateGrowthGroup',
      );
    }
  }

  public async removeGrowthGroup(id: number): Promise<GrowthGroup> {
    try {
      await this.growthGroupRepository.softDelete(id);
      return await this.growthGroupRepository.findOne({
        where: { id },
        withDeleted: true,
      });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while removing growthGroup with ID: ${id}`,
        error.stack,
        'GrowthGroupService/removeGrowthGroup',
      );
    }
  }

  public async restoreGrowthGroup(id: number): Promise<GrowthGroup> {
    try {
      await this.growthGroupRepository.restore(id);
      return await this.growthGroupById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while restoring growthGroup with ID: ${id}`,
        error.stack,
        'GrowthGroupService/restoreGrowthGroup',
      );
    }
  }
}
