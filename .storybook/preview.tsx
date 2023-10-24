import {NavigationContainer} from '@react-navigation/native'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Preview} from '@storybook/react'
import {FC} from 'react'
import {DeviceProvider} from '../src/providers/device.provider'
import {StoreProvider} from '../src/providers/store.provider'
import {baseColor} from '../src/themes/tokens/base-color'

import './preview.css'

const MainDecorator = (Story: FC) => (
  <NavigationContainer>
    <StoreProvider>
      <DeviceProvider>
        <Story />
      </DeviceProvider>
    </StoreProvider>
  </NavigationContainer>
)

const preview: Preview = {
  decorators: [MainDecorator],
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
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
}

export default preview
