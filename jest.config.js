module.exports = {
    preset: 'ts-jest',
    globals: {
        "ts-jest": {
          isolatedModules: true,
        },
      },
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
