import { Module } from '@nestjs/common';
import { HelloWordService } from './hello-word.service';
import { HelloWordResolver } from './hello-word.resolver';

@Module({
  providers: [HelloWordResolver, HelloWordService]
})
export class HelloWordModule {}
