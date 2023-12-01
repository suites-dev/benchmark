import { Test } from '@nestjs/testing';
import { CatsController } from '../../src/controller';
import { CatsModule } from '../../src/module';
import { createMock } from '@golevelup/ts-jest';

describe('', () => {
    let cats: CatsController;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({imports: [CatsModule]})
            .useMocker(createMock)
            .compile();

        cats = moduleRef.get(CatsController);
    });

    it('', () => {
        cats.voice();
    });
});
