/* eslint-disable react-refresh/only-export-components */
import {NavigationContainer} from '@react-navigation/native'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Preview} from '@storybook/react'
import {FC} from 'react'
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
      values: [
        {
          name: 'custom-grey0',
          value: baseColor.custom.grey0,
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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphonex',
    },
  },

  tags: ['autodocs'],
}

export default preview
