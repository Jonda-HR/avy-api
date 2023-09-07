import { Resolver, Query } from '@nestjs/graphql';
import { HelloWordService } from './hello-word.service';

@Resolver('HelloWord')
export class HelloWordResolver {
  constructor(private readonly helloWordService: HelloWordService) {}

  @Query('helloWord')
  findAll() {
    return 'Hello Word';
  }
}
