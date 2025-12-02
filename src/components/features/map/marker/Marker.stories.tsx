import {Image, type ImageSourcePropType} from 'react-native'
import {MarkerVariant} from './markers'
import type {MarkerProps} from './Marker'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const MOCK_MARKER_MAP: Record<MarkerVariant, ImageSourcePropType | undefined> =
  {
    pin: require('@/assets/images/map/pin.png') as ImageSourcePropType,
    distinctPin:
      require('@/assets/images/map/distinct_pin.png') as ImageSourcePropType,
    selectedPin:
      require('@/assets/images/map/selected_pin.png') as ImageSourcePropType,
  }

const MarkerMock = ({variant = MarkerVariant.pin}: MarkerProps) => (
  <Image
    source={MOCK_MARKER_MAP[variant]}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{width: 40, height: 40}}
  />
)

const meta = {
  component: MarkerMock,
} satisfies Meta<typeof MarkerMock>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: MarkerVariant.pin,
    coordinate: {
      latitude: 1,
      longitude: 1,
    },
  },
}

export const Selected: Story = {
  args: {
    variant: MarkerVariant.selectedPin,
    coordinate: {
      latitude: 1,
      longitude: 1,
    },
  },
}

export const Distinct: Story = {
  args: {
    variant: MarkerVariant.distinctPin,
    coordinate: {
      latitude: 1,
      longitude: 1,
    },
  },
}
