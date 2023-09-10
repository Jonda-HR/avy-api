import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dinner } from './entities/dinner.entity';
import { Repository } from 'typeorm';
import { CreateDinnerInput, UpdateDinnerInput } from 'src/graphql';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';

@Injectable()
export class DinnerService {
  constructor(
    @InjectRepository(Dinner)
    private dinnerRepository: Repository<Dinner>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  public async dinners(): Promise<Dinner[]> {
    try {
      return await this.dinnerRepository.find({
        order: { dinnerName: 'ASC' },
      });
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while getting the dinners.',
        error.stack,
        'DinnerService/dinners',
      );
    }
  }

  public async createDinner(input: CreateDinnerInput): Promise<Dinner> {
    try {
      const newDinner = this.dinnerRepository.create(input);
      return await this.dinnerRepository.save(newDinner);
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while creating a new dinner.',
        error.stack,
        'DinnerService/createDinner',
      );
    }
  }

  public async dinnerById(id: number): Promise<Dinner> {
    try {
      return await this.dinnerRepository.findOneBy({ id });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while obtaining the dinner with ID: ${id}`,
        error.stack,
        'DinnerService/dinnerById',
      );
    }
  }

  public async updateDinner(
    id: number,
    input: UpdateDinnerInput,
  ): Promise<Dinner> {
    try {
      await this.dinnerRepository.update(id, input);
      return await this.dinnerById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while updating dinner with ID: ${id}`,
        error.stack,
        'DinnerService/updateDinner',
      );
    }
  }

  public async removeDinner(id: number): Promise<Dinner> {
    try {
      await this.dinnerRepository.softDelete(id);
      return await this.dinnerRepository.findOne({
        where: { id },
        withDeleted: true,
      });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while removing dinner with ID: ${id}`,
        error.stack,
        'DinnerService/removeDinner',
      );
    }
  }

  public async restoreDinner(id: number): Promise<Dinner> {
    try {
      await this.dinnerRepository.restore(id);
      return await this.dinnerById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while restoring dinner with ID: ${id}`,
        error.stack,
        'DinnerService/restoreDinner',
      );
    }
  }
}
