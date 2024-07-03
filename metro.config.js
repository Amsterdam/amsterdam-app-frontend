const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')

const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: defaultAssetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultSourceExts, 'svg'],
  },
}

/* redux-devtools-cli start */
if (/start|^react-native$/.test(process.env.npm_lifecycle_script)) {
  import('@redux-devtools/cli').then(({default: devtools}) => {
    devtools({host: 'localhost', port: 8000, protocol: 'http'})
  })
} else {
  // eslint-disable-next-line no-console
  console.log('Not starting Redux DevTools')
}
/* redux-devtools-cli end */

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
