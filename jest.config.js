module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    './.config/jest-init.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/node_modules/react-native/jest/setup.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/App-test.tsx',
    'node_modules',
    'android',
    'ios',
    '.storybook',
    '.vscode',
    '.husky',
    'logs',
    'patches',
  ],
  cacheDirectory: '.jest/cache',
  coverageReporters: ['cobertura'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.stories.{ts,tsx}',
  ],
  reporters: [
    'default',
    [
      'jest-trx-results-processor',
      {
        outputFile: './.jest/jestTestResults.trx',
        defaultUserName: 'user name to use if automatic detection fails',
      },
    ],
  ],
  testTimeout: 30000,
}
