import path from 'path'
import {isPreservingSymlinks} from '@storybook/core-common'
import {StorybookConfig} from '@storybook/react-vite'
import react from '@vitejs/plugin-react'
import merge from 'lodash/merge'
import svgr from 'vite-plugin-svgr'

const aliases = Object.entries(
  require('../.config/alias.js') as Record<string, string>,
).map(([find, replacement]) => ({
  find,
  replacement: path.resolve(__dirname, `.${replacement}`),
}))

const extensions = [
  '.css',
  '.jpg',
  '.js',
  '.json',
  '.jsx',
  '.png',
  '.svg',
  '.ts',
  '.tsx',
  '.web.jsx',
  '.web.js',
  '.web.ts',
  '.web.tsx',
]

const config: StorybookConfig = {
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },

  docs: {},

  staticDirs: ['./public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  viteFinal: viteConfig =>
    merge(viteConfig, {
      base: './',
      define: {
        __DEV__: false,
        // process.env is causing a conflict with immer (dependency of redux) and Vite requires us to fix it like so
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          resolveExtensions: extensions,
        },
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
      plugins: [
        react(),
        svgr({
          include: '**/*.svg',
        }),
      ],
      resolve: {
        preserveSymlinks: isPreservingSymlinks(),
        // this list is ordered: higher items are matched first
        alias: [
          {
            find: 'react-native-fast-image',
            replacement: require.resolve('./mocks/fast-image'),
          },
          {
            find: 'react-native-image-crop-picker',
            replacement: require.resolve('./mocks/image-crop-picker'),
          },
          {
            find: 'react-native-safe-area-context',
            replacement: require.resolve('./mocks/safe-area-context'),
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
            find: '@sentry/react-native',
            replacement: require.resolve('./mocks/sentry'),
          },
          {
            find: '@react-native-firebase/messaging',
            replacement: require.resolve('./mocks/firebase'),
          },
          {
            find: '@microsoft/applicationinsights-web',
            replacement: require.resolve('./mocks/application-insights'),
          },
          ...aliases,
        ],
        extensions,
      },
    }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config
