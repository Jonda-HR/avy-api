import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorResolver } from './sector.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  exports: [TypeOrmModule],
  providers: [SectorResolver, SectorService],
})
export class SectorModule {}
