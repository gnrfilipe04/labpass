module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: [
    '/node_modules',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
  ],
}
