import {NavigationContainer} from '@react-navigation/native'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import React, {FC} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {RootProvider} from '@/providers'
import {baseColor} from '@/themes/tokens/base-color'
// eslint-disable-next-line no-restricted-imports
import './preview.css'

export const parameters = {
  backgrounds: {
    values: [
      {
        name: 'neutral-grey1',
        value: baseColor.neutral.grey1,
      },
      {
        name: 'primary-blue',
        value: baseColor.primary.blue,
      },
      {
        name: 'primary-red',
        value: baseColor.primary.red,
      },
      {
        name: 'primary-black',
        value: baseColor.primary.black,
      },
      {
        name: 'secondary-yellow',
        value: baseColor.secondary.yellow,
      },
      {
        name: 'secondary-purple',
        value: baseColor.secondary.purple,
      },
    ],
  },
  controls: {expanded: true},
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
}

export const decorators = [
  (Story: FC) => (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootProvider>
          <Story />
        </RootProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  ),
]
