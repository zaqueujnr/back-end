/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      diagnostics: false,
    }],
  },
  roots: ['<rootDir>/src/test'], // Limita o escopo de busca
  testMatch: ['**/*.test.ts'],   // Apenas arquivos de teste
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
};