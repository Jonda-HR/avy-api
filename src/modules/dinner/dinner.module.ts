import { Module } from '@nestjs/common';
import { DinnerService } from './dinner.service';
import { DinnerResolver } from './dinner.resolver';
import { Dinner } from './entities/dinner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleErrorModule } from 'src/utilities/handleError/handleError.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dinner]), HandleErrorModule],
  exports: [TypeOrmModule],
  providers: [DinnerResolver, DinnerService],
})
export class DinnerModule {}
