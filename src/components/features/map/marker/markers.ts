import {Platform} from 'react-native'
import favoritePinIcon from '@/assets/images/map/favorite_pin.png'
import pinIcon from '@/assets/images/map/pin.png'
import selectedPinIcon from '@/assets/images/map/selected_pin.png'

export const MARKER_IMAGES = {
  pin: Platform.select({
    ios: pinIcon,
    android: {uri: 'pin'},
  }),
  selectedPin: Platform.select({
    ios: selectedPinIcon,
    android: {uri: 'selected_pin'},
  }),
  favoritePin: Platform.select({
    ios: favoritePinIcon,
    android: {uri: 'favorite_pin'},
  }),
} as const

export type MarkerVariants = keyof typeof MARKER_IMAGES
