import { Controller, Get } from '@nestjs/common';
import { CatsService } from './service';

@Controller('cats')
export class CatsController {
  constructor(private cats: CatsService) {}

  @Get('/')
  voice() {
    return this.cats.meow();
  }
}
