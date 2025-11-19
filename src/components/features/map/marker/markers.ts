import {Platform} from 'react-native'
import pinIcon from '@/assets/images/map/pin.png'

export const MARKER_IMAGES = {
  pin: Platform.select({
    ios: pinIcon,
    android: {uri: 'pin'},
  }),
  selectedPin: Platform.select({
    ios: pinIcon, // placeholder
    android: {uri: 'pin'}, // placeholder
  }),
} as const

export type MarkerVariants = keyof typeof MARKER_IMAGES
