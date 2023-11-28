import {Injectable} from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor() {}

  meow() {
    console.log('Meow');
  }
}
