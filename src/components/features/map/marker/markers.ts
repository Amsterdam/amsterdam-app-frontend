import {Platform, type ImageURISource} from 'react-native'
import favoritePinIcon from '@/assets/images/map/favorite_pin.png'
import pinIcon from '@/assets/images/map/pin.png'
import selectedPinIcon from '@/assets/images/map/selected_pin.png'

export enum MarkerVariant {
  cluster = 'cluster',
  favoritePin = 'favoritePin',
  pin = 'pin',
  selectedPin = 'selectedPin',
}
export const MARKER_IMAGES: Record<
  MarkerVariant,
  ImageURISource | {uri: string} | undefined
> = {
  [MarkerVariant.pin]: Platform.select({
    ios: pinIcon,
    android: {uri: 'pin'},
  }),
  [MarkerVariant.selectedPin]: Platform.select({
    ios: selectedPinIcon,
    android: {uri: 'selected_pin'},
  }),
  [MarkerVariant.favoritePin]: Platform.select({
    ios: favoritePinIcon,
    android: {uri: 'favorite_pin'},
  }),
  cluster: undefined,
}
