import {Config} from 'jest'

const config: Config = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@microsoft/applicationinsights-react-native':
      '<rootDir>/.storybook/mocks/application-insights-react-native',
    '@microsoft/applicationinsights-web':
      '<rootDir>/.storybook/mocks/application-insights-web',
  },
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
    '.git',
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
    '!src/processes/piwik/init.ts',
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
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@notifee)',
  ],
  globals: {
    API_KEY: '',
    VERSION: '0.0.0',
    BUILD_NUMBER: 0,
    PIWIK_PRO_URL: '',
    PIWIK_PRO_ID: '',
    PIWIK_PRO_URL_ACCEPT: '',
    PIWIK_PRO_ID_ACCEPT: '',
    APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV: '',
    APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST: '',
    APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC: '',
    APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD: '',
  },
}

// eslint-disable-next-line import/no-default-export
export default config
