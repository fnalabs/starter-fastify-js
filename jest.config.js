/** @type {import("jest").Config} **/
export default {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  transform: {},
  transformIgnorePatterns: ['node_modules'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
}
