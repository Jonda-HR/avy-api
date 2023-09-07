import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWordService {
  findAll() {
    return 'Hola Mundo';
  }
}
