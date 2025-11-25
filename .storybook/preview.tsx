/* eslint-disable react-refresh/only-export-components */
import {NavigationContainer} from '@react-navigation/native'
import {Preview} from '@storybook/react'
import {FC} from 'react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {DeviceProvider} from '../src/providers/device.provider'
import {StoreProvider} from '../src/providers/store.provider'
import {baseColor} from '../src/themes/tokens/base-color'
import {AppInsightsProvider} from '@/providers/appinsights.provider'

import './preview.css'

const MainDecorator = (Story: FC) => (
  <AppInsightsProvider>
    <NavigationContainer>
      <StoreProvider>
        <DeviceProvider>
          <Story />
        </DeviceProvider>
      </StoreProvider>
    </NavigationContainer>
  </AppInsightsProvider>
)

const preview: Preview = {
  decorators: [MainDecorator],

  parameters: {
    backgrounds: {
      options: {
        'custom-grey0': {
          name: 'custom-grey0',
          value: baseColor.custom.grey0,
        },

        'primary-blue': {
          name: 'primary-blue',
          value: baseColor.primary.blue,
        },

        'primary-red': {
          name: 'primary-red',
          value: baseColor.primary.red,
        },

        'primary-black': {
          name: 'primary-black',
          value: baseColor.primary.black,
        },

        'secondary-yellow': {
          name: 'secondary-yellow',
          value: baseColor.secondary.yellow,
        },

        'secondary-purple': {
          name: 'secondary-purple',
          value: baseColor.secondary.purple,
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },

  tags: ['autodocs'],

  initialGlobals: {
    viewport: {
      value: 'iphonex',
      isRotated: false,
    },
  },
}

export default preview
