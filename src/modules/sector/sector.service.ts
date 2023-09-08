import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { Repository } from 'typeorm';
import { CreateSectorInput, UpdateSectorInput } from 'src/graphql';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
  ) {}

  public async sectors(): Promise<Sector[]> {
    return await this.sectorRepository.find({
      order: { sectorName: 'ASC' },
    });
  }

  public async createSector(input: CreateSectorInput): Promise<Sector> {
    const newSector = this.sectorRepository.create(input);
    return await this.sectorRepository.save(newSector);
  }

  public async sectorById(id: number): Promise<Sector> {
    return await this.sectorRepository.findOneBy({ id });
  }

  public async updateSector(
    id: number,
    input: UpdateSectorInput,
  ): Promise<Sector> {
    await this.sectorRepository.update(id, input);
    return await this.sectorById(id);
  }

  public async removeSector(id: number): Promise<Sector> {
    await this.sectorRepository.softDelete(id);
    return await this.sectorRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  public async restoreSector(id: number): Promise<Sector> {
    await this.sectorRepository.restore(id);
    return await this.sectorById(id);
  }
}
