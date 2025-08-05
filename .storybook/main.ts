import path from 'path'
import {StorybookConfig} from '@storybook/react-vite'
import {mergeConfig} from 'vite'
// import react from '@vitejs/plugin-react'
// import {isPreservingSymlinks} from 'storybook/internal/common'
// import {mergeConfig} from 'vite'
// import svgr from 'vite-plugin-svgr'

const aliases = Object.entries(
  require('../.config/alias.js') as Record<string, string>,
).map(([find, replacement]) => ({
  find,
  replacement: path.resolve(__dirname, `.${replacement}`),
}))

// const aliases = Object.entries(
//   require('../.config/alias.js') as Record<string, string>,
// ).reduce(
//   (acc, [find, replacement]) => {
//     acc[find] = path.resolve(__dirname, `.${replacement}`)

//     return acc
//   },
//   {} as Record<string, string>,
// )

// const mapAliases = (aliases: Record<string, string>) =>
// Object.entries(aliases).reduce(
//   (acc, [find, replacement]) => {
//     acc[find] = path.resolve(__dirname, `.${replacement}`)

//     return acc
//   },
//   {} as Record<string, string>,
// )

// const extensions = [
//   '.web.jsx',
//   '.web.js',
//   '.web.tsx',
//   '.web.ts',
//   '.jsx',
//   '.js',
//   '.tsx',
//   '.ts',
//   '.css',
//   '.jpg',
//   '.json',
//   '.png',
//   '.svg',
// ]
/*
const alias = {
  ...aliases,
  // 'react-native/Libraries/vendor/emitter/EventEmitter':
  //   require.resolve('react-native-web') +
  //   '/Libraries/vendor/emitter/EventEmitter',
  'react-native/Libraries/vendor/emitter/EventEmitter':
    '/Users/rik/workspace/aapp_app_mobile/node_modules/react-native-web/dist/cjs/vendor/react-native/vendor/emitter/EventEmitter.js',
  // require.resolve('react-native-web') +
  // '/Libraries/vendor/emitter/EventEmitter',
  'react-native-image-crop-picker': require.resolve(
    './mocks/image-crop-picker',
  ),
  'react-native-barcode-creator': require.resolve(
    './mocks/react-native-barcode-creator',
  ),
  'react-native-safe-area-context': require.resolve(
    './mocks/safe-area-context',
  ),
  'react-native-keyboard-aware-scroll-view': require.resolve(
    './mocks/react-native-keyboard-aware-scroll-view',
  ),
  'react-native-svg': 'react-native-svg-web',
  // 'react-native': 'react-native-web',
  '@env': require.resolve('./mocks/env'),
  '@notifee/react-native': require.resolve('./mocks/notifee'),
  '@react-native-firebase/messaging': require.resolve('./mocks/firebase'),
  '@microsoft/applicationinsights-web': require.resolve(
    './mocks/application-insights-web',
  ),
  'react-native-date-picker': require.resolve(
    './mocks/react-native-date-picker',
  ),
  '@react-native-firebase/app': require.resolve(
    './mocks/react-native-date-picker',
  ),
  'expo-clipboard': require.resolve('./mocks/expo-clipboard'),
}
*/
const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
  ],

  // framework: {
  //   name: '@storybook/react-vite',
  //   options: {},
  // },

  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      builder: {},
      pluginReactOptions: {
        babel: {
          parserOpts: {
            plugins: [
              [
                'module:react-native-dotenv',
                {
                  moduleName: '@env',
                  path: '.env',
                  allowlist: [
                    'API_KEY_DEV',
                    'API_KEY_TEST',
                    'API_KEY_ACC',
                    'API_KEY_PROD',
                    'BUILD_NUMBER',
                    'PIWIK_PRO_ID',
                    'PIWIK_PRO_ID_ACCEPT',
                    'PIWIK_PRO_URL',
                    'PIWIK_PRO_URL_ACCEPT',
                    'VERSION',
                    'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV',
                    'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST',
                    'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC',
                    'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD',
                    'CHAT_DEVELOPER_NAME_DEV',
                    'CHAT_ORGANIZATION_ID_DEV',
                    'CHAT_URL_DEV',
                    'CHAT_DEVELOPER_NAME_TEST',
                    'CHAT_ORGANIZATION_ID_TEST',
                    'CHAT_URL_TEST',
                    'CHAT_DEVELOPER_NAME_ACC',
                    'CHAT_ORGANIZATION_ID_ACC',
                    'CHAT_URL_ACC',
                    'CHAT_DEVELOPER_NAME_PROD',
                    'CHAT_ORGANIZATION_ID_PROD',
                    'CHAT_URL_PROD',
                  ],
                },
              ],
            ],
          },
        },
      },
    },
  },

  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },

  docs: {},

  staticDirs: ['./public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  viteFinal: viteConfig =>
    mergeConfig(viteConfig, {
      /*base: './',
      define: {
        __DEV__: false,
        // process.env is causing a conflict with immer (dependency of redux) and Vite requires us to fix it like so
        'process.env': {
          // eslint-disable-next-line no-process-env
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          resolveExtensions: extensions,
          loader: {
            '.js': 'jsx', // <-- Move this line here!
          },
        },
        // exclude: [
        //   ...(viteConfig.optimizeDeps?.exclude ?? []),
        //   'react-native-reanimated',
        // ],
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
      plugins: [
        react(),
        svgr({
          include: '** /*.svg',
        }),
      ],*/
      resolve: {
        // preserveSymlinks: isPreservingSymlinks(),
        // this list is ordered: higher items are matched first
        alias: [
          {
            find: 'react-native-image-crop-picker',
            replacement: require.resolve('./mocks/image-crop-picker'),
          },
          {
            find: 'react-native-barcode-creator',
            replacement: require.resolve(
              './mocks/react-native-barcode-creator',
            ),
          },
          {
            find: 'react-native-safe-area-context',
            replacement: require.resolve('./mocks/safe-area-context'),
          },
          {
            find: 'react-native-keyboard-aware-scroll-view',
            replacement: require.resolve(
              './mocks/react-native-keyboard-aware-scroll-view',
            ),
          },
          {
            find: 'react-native-svg',
            replacement: 'react-native-svg-web',
          },
          {
            find: 'react-native',
            replacement: 'react-native-web',
          },
          {
            find: '@env',
            replacement: require.resolve('./mocks/env'),
          },
          {
            find: '@notifee/react-native',
            replacement: require.resolve('./mocks/notifee'),
          },
          {
            find: '@react-native-firebase/messaging',
            replacement: require.resolve('./mocks/firebase'),
          },
          {
            find: '@microsoft/applicationinsights-web',
            replacement: require.resolve('./mocks/application-insights-web'),
          },
          {
            find: 'react-native-date-picker',
            replacement: require.resolve('./mocks/react-native-date-picker'),
          },
          {
            find: 'expo-clipboard',
            replacement: require.resolve('./mocks/expo-clipboard'),
          },
          ...aliases,
          // {
          //   find: '@storybook',
          //   replacement: path.resolve(__dirname, '../.storybook'),
          // },
          // {
          //   find: '@',
          //   replacement: path.resolve(__dirname, '../src'),
          // },
        ],
        // extensions,
      },
    }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

// console.log(alias)

export default config
