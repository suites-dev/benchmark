const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const childProcess = require('child_process');
const { rimraf } = require('rimraf');

const testSuites = 1000;
const tempDir = path.join(__dirname, 'temp');

(async () => {
    console.log('Cleaning up');
    await Promise.all([
        rimraf(tempDir),
        rimraf(path.join(__dirname, 'dist')),
    ]);

    console.log('Expanding into temp directory ' + tempDir);
    await Promise.all([
        ...generateTemp('automock', 'tsc'),
        ...generateTemp('automock', 'tsc-isolated'),
        ...generateTemp('automock', 'swc'),
        ...generateTemp('nestjs', 'tsc'),
        ...generateTemp('nestjs', 'tsc-isolated'),
        ...generateTemp('nestjs', 'swc'),
    ]);

    console.log(`Benchmarking performance with ${testSuites} suites to compile and run`);
    const results = {
        tsc: { automock: NaN, nestjs: NaN },
        'tsc-isolated': { automock: NaN, nestjs: NaN },
        swc: { automock: NaN, nestjs: NaN },
    };
    for (const compiler of ['TSC', 'TSC-Isolated', 'SWC']) {
        for (const technique of ['Automock', 'NestJS']) {
            console.log(`Benchmarking ${compiler} + ${technique}`);
            results[compiler.toLowerCase()][technique.toLocaleLowerCase()] =
                await measureTime(() =>
                    runCommand(
                        'jest .',
                        path.join(
                            tempDir,
                            technique.toLocaleLowerCase(),
                            compiler.toLowerCase()
                        )
                    )
                );
        }
    }

    console.log('Results:');
    console.table(results);
})((error) => {
    console.error(error);
    process.exit(1);
});

function generateTemp(technique, compiler) {
    return [
        fs.promises.cp(path.join(__dirname, 'src'), path.join(tempDir, technique, compiler, 'src'), { recursive: true })
            .then(() =>
                fs.promises.cp(path.join(__dirname, 'benchmark', compiler), path.join(tempDir, technique, compiler), { recursive: true }),
            ),
        [...Array(testSuites).keys()].map(() =>
            fs.promises.cp(
                path.join(__dirname, 'benchmark', technique, 'test.ts'),
                path.join(tempDir, technique, compiler, 'gen', 'test', `${generateSuiteName()}.test.ts`)
            )
        )
    ]
}

function generateSuiteName() {
    return crypto.randomUUID();
}

async function measureTime(callback) {
    const start = Date.now();
    await callback();
    const end = Date.now();
    return end - start;
}

function runCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        childProcess.exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                console.error(stderr);
                reject(error);
                return;
            }
            resolve();
        });
    });
}
