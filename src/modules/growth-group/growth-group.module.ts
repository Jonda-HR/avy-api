import { Module } from '@nestjs/common';
import { GrowthGroupService } from './growth-group.service';
import { GrowthGroupResolver } from './growth-group.resolver';
import { GrowthGroup } from './entities/growth-group.entity';
import { HandleErrorModule } from 'src/utilities/handleError/handleError.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GrowthGroup]), HandleErrorModule],
  exports: [TypeOrmModule],
  providers: [GrowthGroupResolver, GrowthGroupService],
})
export class GrowthGroupModule {}
