const alias = require('./.config/alias.js')

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowlist: [
          'API_KEY',
          'AUTH_PASSWORD',
          'AUTH_SHARED_SECRET',
          'BUILD_NUMBER',
          'PIWIK_PRO_ID',
          'PIWIK_PRO_ID_ACCEPT',
          'PIWIK_PRO_URL',
          'PIWIK_PRO_URL_ACCEPT',
          'VERSION',
        ],
      },
    ],
    [
      'module-resolver',
      {
        // note: setting the root to ./src does not work; for now we prepend src to all paths
        root: ['.'],
        extensions: ['.tsx', '.ts', '.html'],
        alias,
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
