# NestJS mocks benchmark

The goal of this benchmark is to compare the performance of various test setup techniques in NestJS framework, with various compiler configurations.
It will be used for identifying areas of improvement related to the involved techniques.

## Scope

Techniques:

- [`@automock/jest`](https://github.com/automock/automock)
- [`@nestjs/testing`](https://docs.nestjs.com/fundamentals/testing)

Compilers:

- [TSC](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [SWC](https://swc.rs/)
