import {Platform, type ImageURISource} from 'react-native'
import distinctPinIcon from '@/assets/images/map/distinct_pin.png'
import pinIcon from '@/assets/images/map/pin.png'
import selectedPinIcon from '@/assets/images/map/selected_pin.png'

export enum MarkerVariant {
  distinctPin = 'distinctPin',
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
  [MarkerVariant.distinctPin]: Platform.select({
    ios: distinctPinIcon,
    android: {uri: 'distinct_pin'},
  }),
}
