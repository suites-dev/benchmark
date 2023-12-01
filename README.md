# TypeScript Compiler Benchmark Analysis

## Overview

This document provides a detailed analysis of TypeScript compiler performance across various Node.js versions.
Benchmarks were conducted on 1000 test suites in Automock and NestJS environments.

### Testing Environment

- **Machine**: GitHub Native Workflow (Ubuntu Latest)
- **Jest Version**: 29.7.0
- **TypeScript Version**: 5.3.2
- **Relevant Dependencies**:
  - @automock/adapters.nestjs: ^2.0.0
  - @automock/jest: ^2.0.0
  - @golevelup/ts-jest: ^0.4.0
  - @nestjs/common: ^10.2.10
  - @nestjs/core: ^10.2.10
  - @nestjs/testing: ^10.2.10
  - @swc/jest: ^0.2.29

### Benchmark Results

#### Node v20

| Compiler         | automock (ms) | NestJS (ms) |
|------------------|---------------|-------------|
| **tsc**          | 174569        | 245705      |
| **tsc-isolated** | 99139         | 134079      |
| **swc**          | 90483         | 129110      |

#### Node v18

| Compiler         | automock (ms) | NestJS (ms) |
|------------------|---------------|-------------|
| **tsc**          | 321784        | 431411      |
| **tsc-isolated** | 230833        | 303219      |
| **swc**          | 226546        | 303635      |

#### Node v16

| Compiler         | automock (ms) | NestJS (ms) |
|------------------|---------------|-------------|
| **tsc**          | 394804        | 548740      |
| **tsc-isolated** | 282173        | 326732      |
| **swc**          | 224413        | 349720      |

### Performance Comparison (Compared to Fastest - SWC)

#### Node v20

| Environment  | tsc (Slower by %) | tsc-isolated (Slower by %) |
|--------------|-------------------|----------------------------|
| **automock** | +93.1%            | +9.6%                      |
| **NestJS**   | +90.4%            | +3.8%                      |

#### Node v18

| Environment  | tsc (Slower by %) | tsc-isolated (Slower by %) |
|--------------|-------------------|----------------------------|
| **automock** | +42.0%            | +1.9%                      |
| **NestJS**   | +42.1%            | -0.1%                      |

#### Node v16

| Environment  | tsc (Slower by %) | tsc-isolated (Slower by %) |
|--------------|-------------------|----------------------------|
| **automock** | +75.9%            | +25.7%                     |
| **NestJS**   | +56.9%            | -8.0%                      |

### Environment Speed Comparison (Automock vs. Nestjs)

#### Node v20

| Compiler         | Speed Increase (%) |
|------------------|--------------------|
| **tsc**          | +28.9%             |
| **tsc-isolated** | +26.0%             |
| **swc**          | +23.2%             |

#### Node v18

| Compiler         | Speed Increase (%) |
|------------------|--------------------|
| **tsc**          | +25.4%             |
| **tsc-isolated** | +23.9%             |
| **swc**          | +25.4%             |

#### Node v16

| Compiler         | Speed Increase (%) |
|------------------|--------------------|
| **tsc**          | +28.0%             |
| **tsc-isolated** | +13.6%             |
| **swc**          | +35.8%             |

### Key Insights

- **Performance Across Node Versions**:
  - All compilers show decreased performance with older Node.js versions.
  - The impact is more pronounced in the NestJS environment.
- **Comparing Compilers**:
  - `swc` consistently outperforms `tsc` and `tsc-isolated` in all Node versions.
- **tsc vs. tsc-isolated**:
  - `tsc-isolated` demonstrates better performance than `tsc` across all Node versions.
- **Automock vs. Nestjs**:
  - All compilers are faster in Automock than in NestJS, indicating higher complexity or resource demands
    in NestJS.

### Speed Difference Between Automock and NestJS

- **Node v20 Analysis**:
  - All compilers exhibited significantly faster performance in the Automock environment compared to NestJS.
  - `tsc` showed a 28.9% speed increase in Automock, while `tsc-isolated` and `swc` displayed increases of 26.0% and
    23.2%, respectively.
  - This suggests that Automock is substantially less resource-intensive than NestJS.

- **Node v18 Insights**:
  - The trend of faster performance in Automock persists in Node v18.
  - `tsc` was 25.4% faster in Automock, closely followed by `swc` with a similar 25.4% increase, and `tsc-isolated`
    showed a 23.9% increase.
  - These results further underline the efficiency and lower complexity of Automock compared to NestJS.

- **Node v16 Observations**:
  - The performance gap between Automock and NestJS remains notable in Node v16.
  - `tsc` registered a 28.0% speed increase in Automock, while `tsc-isolated` had a 13.6% increase. Notably, `swc`
    showed the most significant difference with a 35.8% increase.
  - This indicates that Automock maintains its efficiency advantage over NestJS even in older Node.js environments.

In summary, across all tested Node.js versions, Automock consistently outperforms NestJS in terms of speed for all
compilers. The difference is marked and suggests that Automock is a more efficient environment, possibly due to lower
complexity or better resource optimization.

### Visualizations

<img width="750" src="https://github.com/automock/benchmark/blob/master/node20.jpg?raw=true" alt="Node20" />
<br />
<img width="750" src="https://github.com/automock/benchmark/blob/master/node18.jpg?raw=true" alt="Node18" />
<br />
<img width="750" src="https://github.com/automock/benchmark/blob/master/node16.jpg?raw=true" alt="Node16" />
