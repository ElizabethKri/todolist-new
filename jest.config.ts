import type {Config} from 'jest';

// const config:
//     Config = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
// // Указываем Node.js как тестовую среду
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//     transform: {'^.+\\.(ts|tsx)$': 'ts-jest',},
// };
// export default config;

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.node.json' }],
    },
    testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};

export default config;