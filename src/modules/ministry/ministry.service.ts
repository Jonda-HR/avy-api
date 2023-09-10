import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ministry } from './entities/ministry.entity';
import { Repository } from 'typeorm';
import { CreateMinistryInput, UpdateMinistryInput } from 'src/graphql';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';

@Injectable()
export class MinistryService {
  constructor(
    @InjectRepository(Ministry)
    private ministryRepository: Repository<Ministry>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  public async ministries(): Promise<Ministry[]> {
    try {
      return await this.ministryRepository.find({
        order: { ministryName: 'ASC' },
      });
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while getting the ministries',
        error.stack,
        'MinistryService/ministries',
      );
    }
  }

  public async createMinistry(input: CreateMinistryInput): Promise<Ministry> {
    try {
      const newMinistry = this.ministryRepository.create(input);
      return await this.ministryRepository.save(newMinistry);
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while creating a new Ministry',
        error.stack,
        'MinistryService/createMinistry',
      );
    }
  }

  public async ministryById(id: number): Promise<Ministry> {
    try {
      return await this.ministryRepository.findOneBy({ id });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while getting the ministry with ID: ${id}`,
        error.stack,
        'MinistryService/ministryById',
      );
    }
  }

  public async updateMinistry(
    id: number,
    input: UpdateMinistryInput,
  ): Promise<Ministry> {
    try {
      await this.ministryRepository.update(id, input);
      return await this.ministryById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while updating ministry with ID: ${id}`,
        error.stack,
        'MinistryService/updateMinistry',
      );
    }
  }

  public async removeMinistry(id: number): Promise<Ministry> {
    try {
      await this.ministryRepository.softDelete(id);
      return await this.ministryRepository.findOne({
        where: { id },
        withDeleted: true,
      });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while removing the ministry with ID: ${id}`,
        error.stack,
        'MinistryService/removeMinistry',
      );
    }
  }

  public async restoreMinistry(id: number): Promise<Ministry> {
    try {
      await this.ministryRepository.restore(id);
      return await this.ministryById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while restoring the ministry with ID: ${id}`,
        error.stack,
        'MinistryService/restoreMinistry',
      );
    }
  }
}
