module.exports = {
  root: true,
  plugins: [
    'import-x',
    'prefer-arrow-functions',
    'typescript-sort-keys',
    'jest',
    'sonarjs',
    'amsterdam',
    'react-refresh',
    'depend',
  ],
  extends: [
    '@react-native',
    'plugin:storybook/recommended',
    'plugin:storybook/csf',
    'plugin:storybook/csf-strict',
    'plugin:react/jsx-runtime',
    'plugin:sonarjs/recommended-legacy', // legacy is for ESlint 8
  ],
  ignorePatterns: [
    '!.storybook',
    '!.*',
    'node_modules',
    'android',
    'patches',
    'pipelines',
    'storybook-static',
    'coverage',
    '.git',
    'ios',
    '.jest',
    '.expo',
  ],

  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.mjs'],
      rules: {
        'no-process-env': 'error',
        'depend/ban-dependencies': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        'react-hooks/exhaustive-deps': [
          'error',
          {
            additionalHooks: '(useAsync)',
          },
        ],
        'react-refresh/only-export-components': 'warn',
        'react-native/no-raw-text': [
          'error',
          {skip: ['Phrase', 'Paragraph', 'InlineLink']},
        ],
        'react-native/no-single-element-style-arrays': 'warn',
        'import-x/no-default-export': 'error',
        'import-x/order': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'type',
            ],
            alphabetize: {
              order: 'asc',
            },
          },
        ],
        '@typescript-eslint/no-magic-numbers': [
          'off',
          {
            ignoreArrayIndexes: true,
            ignore: [0, 1, -1],
            ignoreEnums: true,
            ignoreTypeIndexes: true,
          },
        ],
        'import-x/prefer-default-export': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-void': ['error', {allowAsStatement: true}],
        semi: ['error', 'never'],
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@/providers/piwik.context',
                importNames: ['PiwikContext'],
                message:
                  'Do not use PiwikContext directly. The logging methods are exposed via the usePiwik hook.',
              },
              {
                name: '@gorhom/bottom-sheet',
                importNames: ['BottomSheet'],
                message:
                  'Import BottomSheet from @/components/ui/containers/BottomSheet.',
              },
              {
                name: '@react-navigation/stack',
                importNames: ['createStackNavigator'],
                message:
                  'Import createStackNavigator from @/utils/navigation/createStackNavigator.',
              },
              {
                name: '@react-native-community/netinfo',
                message:
                  'Get the internet state from the internet redux slice.',
              },
              {
                name: 'dayjs',
                importNames: ['default'],
                message:
                  'Import dayjs from @/utils/datetime to prevent timezone issues.',
              },
              {
                name: 'react-native-device-info',
                importNames: ['getUniqueId', 'getUniqueIdSync'],
                message:
                  'Do not use getUniqueId, this is considered personal (privacy sensitive) information.',
              },
              {
                name: 'react-native-super-grid',
                importNames: ['SimpleGrid'],
                message:
                  'Import SimpleGrid from @/components/ui/containers/SimpleGrid.',
              },
              {
                name: 'react-redux',
                importNames: ['useDispatch', 'useSelector', 'useStore'],
                message:
                  'Import useDispatch and useSelector from @/hooks/redux.',
              },
              {
                name: '@react-navigation/core',
                message: 'Import from @react-navigation/native instead.',
              },
              {
                name: '@react-navigation/native',
                importNames: [
                  'NavigationProp',
                  'RouteProp',
                  'useNavigation',
                  'useRoute',
                ],
                message:
                  'Import NavigationProp and RouteProp from @/app/navigation/types; useNavigation and useRoute from @/hooks/navigation/.',
              },
              {
                name: 'react-native',
                importNames: ['Pressable', 'PressableProps'],
                message:
                  'Import Pressable and PressableProps from @/components/ui/buttons/Pressable.',
              },
              {
                name: 'react-native-maps',
                importNames: ['Marker'],
                message: 'Import Marker from @/components/features/map/marker.',
              },
            ],
          },
        ],
        'prefer-arrow-functions/prefer-arrow-functions': [
          'error',
          {
            returnStyle: 'implicit',
          },
        ],
        'react/jsx-sort-props': [
          'error',
          {
            ignoreCase: true,
          },
        ],
        'no-extra-semi': 'off',
        'prettier/prettier': 'off',
        'react/jsx-no-explicit-spread': 'off',
        'amsterdam/jsx-no-explicit-spread': 'error',
        'padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            prev: '*',
            next: ['block', 'block-like', 'return'],
          },
          {
            blankLine: 'always',
            prev: ['block', 'block-like'],
            next: '*',
          },
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var'],
          },
        ],
        'no-console': 'warn',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:typescript-sort-keys/recommended',
      ],
      rules: {
        'amsterdam/no-relative-file-import': 'warn',
        'amsterdam/jsx-strict-logical-expression': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/restrict-template-expressions': 'warn',
      },
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    // Jest
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'no-restricted-imports': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'sonarjs/no-duplicate-string': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
      },
    },
    // Storybook config folder and stories
    {
      files: ['.storybook/**/*', '*.stories.tsx'],
      rules: {
        'import-x/no-default-export': 'off',
        'no-restricted-imports': 'off',
        'sonarjs/no-identical-functions': 'off',
        'amsterdam/no-relative-file-import': 'off',
      },
    },
    {
      files: [
        'react-native-salesforce-messaging-in-app/**/*.ts',
        'react-native-salesforce-messaging-in-app/**/*.tsx',
      ],
      rules: {
        'import-x/no-default-export': 'off',
        'amsterdam/no-relative-file-import': 'off',
        'no-restricted-imports': 'off',
        'react-refresh/only-export-components': 'off',
      },
    },
    {
      files: ['*.json'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-jsonc'],
      rules: {},
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      plugins: ['depend'],
      rules: {
        // 'depend/ban-dependencies': 'warn',
      },
    },
  ],
  env: {
    'react-native/react-native': true,
    jest: true,
  },
}
