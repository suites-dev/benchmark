import { TestBed  } from '@automock/jest';
import { CatsController } from '../../src/controller';

describe('', () => {
    let cats: CatsController;

    beforeAll(() => {
        ({ unit: cats } = TestBed.create(CatsController).compile());
    });

    it('', () => {
        cats.voice();
    });
});
