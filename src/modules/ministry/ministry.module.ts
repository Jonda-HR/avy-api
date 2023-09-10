import { Module } from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { MinistryResolver } from './ministry.resolver';
import { Ministry } from './entities/ministry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleErrorModule } from 'src/utilities/handleError/handleError.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ministry]), HandleErrorModule],
  exports: [TypeOrmModule],
  providers: [MinistryResolver, MinistryService],
})
export class MinistryModule {}
