import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { Repository } from 'typeorm';
import { CreateSectorInput, UpdateSectorInput } from 'src/graphql';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  public async sectors(): Promise<Sector[]> {
    try {
      return await this.sectorRepository.find({
        order: { sectorName: 'ASC' },
      });
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while getting the sectors.',
        error.stack,
        'SectorService/sectors',
      );
    }
  }

  public async createSector(input: CreateSectorInput): Promise<Sector> {
    try {
      const newSector = this.sectorRepository.create(input);
      return await this.sectorRepository.save(newSector);
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while creating a new sector.',
        error.stack,
        'SectorService/createSector',
      );
    }
  }

  public async sectorById(id: number): Promise<Sector> {
    try {
      return await this.sectorRepository.findOneBy({ id });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while obtaining the sector with ID: ${id}`,
        error.stack,
        'SectorService/sectorById',
      );
    }
  }

  public async updateSector(
    id: number,
    input: UpdateSectorInput,
  ): Promise<Sector> {
    try {
      await this.sectorRepository.update(id, input);
      return await this.sectorById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while updating sector with ID: ${id}`,
        error.stack,
        'SectorService/updateSector',
      );
    }
  }

  public async removeSector(id: number): Promise<Sector> {
    try {
      await this.sectorRepository.softDelete(id);
      return await this.sectorRepository.findOne({
        where: { id },
        withDeleted: true,
      });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while removing sector with ID: ${id}`,
        error.stack,
        'SectorService/removeSector',
      );
    }
  }

  public async restoreSector(id: number): Promise<Sector> {
    try {
      await this.sectorRepository.restore(id);
      return await this.sectorById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while restoring sector with ID: ${id}`,
        error.stack,
        'SectorService/restoreSector',
      );
    }
  }
}
