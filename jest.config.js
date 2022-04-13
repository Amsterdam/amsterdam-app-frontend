module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    './jest-init.js',
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
    'pacts',
    'patches',
  ],
  cacheDirectory: '.jest/cache',
}
