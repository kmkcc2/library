"use strict";
module.exports = {
    roots: [
        '<rootDir>/build/tests'
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};
