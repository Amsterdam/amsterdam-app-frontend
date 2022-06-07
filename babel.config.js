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
        root: ['./src'],
        extensions: ['.tsx', '.ts', '.html'],
        alias: {
          _app: './app',
          _assets: './assets',
          _components: './components',
          _hooks: './_hooks',
          _modules: './modules',
          _providers: './providers',
          _services: './services',
          _store: './store',
          _styles: './styles',
          _themes: './themes',
          _tokens: './tokens',
          _types: './types',
          _utils: './utils',
        },
      },
    ],
  ],
}
