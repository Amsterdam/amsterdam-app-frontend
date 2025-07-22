const {mergeConfig} = require('@react-native/metro-config')
const {getDefaultConfig} = require('expo/metro-config')

const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts
const defaultAdditionalExts =
  require('metro-config/src/defaults/defaults').additionalExts
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
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
    sourceExts: [...defaultSourceExts, ...defaultAdditionalExts, 'svg'],
  },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
