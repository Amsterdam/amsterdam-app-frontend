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
        alias: {
          '@': './src',
          _app: './src/app',
          _assets: './src/assets',
          _components: './src/components',
          _hooks: './src/hooks',
          _modules: './src/modules',
          _providers: './src/providers',
          _services: './src/services',
          _store: './src/store',
          _styles: './src/styles',
          _themes: './src/themes',
          _tokens: './src/tokens',
          _types: './src/types',
          _utils: './src/utils',
        },
      },
    ],
  ],
}
