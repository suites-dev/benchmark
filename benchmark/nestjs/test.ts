import { Test } from '@nestjs/testing';
import { CatsController } from '../../src/controller';
import { CatsService } from '../../src/service';
import { CatsModule } from '../../src/module';

describe('', () => {
    let cats: CatsController;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({imports: [CatsModule]})
            .overrideProvider(CatsService)
            .useValue({ meow: jest.fn() })
            .compile();
        cats = moduleRef.get(CatsController);
    });

    it('', () => {
        cats.voice();
    });
});
