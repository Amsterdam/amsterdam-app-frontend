import fs from 'fs/promises'
import path from 'path'
import {viteCommonjs, esbuildCommonjs} from '@originjs/vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
// eslint-disable-next-line no-restricted-imports
import alias from './.config/alias'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  define: {
    global: 'window',
  },
  optimizeDeps: {
    include: ['@react-navigation/native'],
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.web.js', '.js', '.ts'],
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup: build => {
            build.onLoad({filter: /src\/.*\.js$/}, async args => ({
              loader: 'jsx',

              contents: await fs.readFile(args.path, 'utf8'),
            }))
          },
        },
        esbuildCommonjs(['@react-navigation/elements']),
      ],
    },
  },
  resolve: {
    extensions: ['.web.tsx', '.web.jsx', '.web.js', '.tsx', '.ts', '.js'],
    alias: {
      'react-native': 'react-native-web',
      '@notifee/react-native': `${path.resolve(
        __dirname,
        './.storybook/mocks/notifee',
      )}/`,
      'react-native-image-crop-picker': `${path.resolve(
        __dirname,
        './.storybook/mocks/react-native-image-crop-picker',
      )}/`,
      'react-native-fast-image': `${path.resolve(
        __dirname,
        './.storybook/mocks/react-native-fast-image',
      )}/`,
      '.storybook': `${path.resolve(__dirname, '.storybook')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
      ...alias,
    },
  },
  plugins: [viteCommonjs(), react()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  esbuild: {
    include: /\.\(jsx?\)$/,
    loader: 'jsx',
  },
})
