import { Module } from '@nestjs/common';
import { HandleErrorService } from './handleError.service';

@Module({
  exports: [HandleErrorService],
  providers: [HandleErrorService],
})
export class HandleErrorModule {}
