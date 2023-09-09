import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorResolver } from './sector.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { HandleErrorModule } from 'src/utilities/handleError/handleError.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sector]), HandleErrorModule],
  exports: [TypeOrmModule],
  providers: [SectorResolver, SectorService],
})
export class SectorModule {}
