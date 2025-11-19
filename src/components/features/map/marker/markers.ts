import {Platform, type ImageURISource} from 'react-native'
import pinIcon from '@/assets/images/map/pin.png'

export type MarkerVariants = 'pin'

export const MARKER_IMAGES: Record<MarkerVariants, ImageURISource | undefined> =
  {
    pin: Platform.select({
      ios: pinIcon,
      android: {uri: 'pin'},
    }),
  }
