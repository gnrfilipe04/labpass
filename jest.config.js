module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFiles: [
    'D:/Projects/expo_apps/labpass/src/jest/setup.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/hooks/*.ts',
    'src/contexts/*.tsx',
    '!src/**/*.spec.tsx',
  ],
}
