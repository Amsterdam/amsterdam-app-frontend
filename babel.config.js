const alias = require('./alias.js')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
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
  ],
}
