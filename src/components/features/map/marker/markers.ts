import {Platform, type ImageURISource} from 'react-native'
import distinctPinIcon from '@/assets/images/map/distinct_pin.png'
import electionsCrowdBusyPinIcon from '@/assets/images/map/elections_crowd_busy_pin.png'
import electionsCrowdCalmPinIcon from '@/assets/images/map/elections_crowd_calm_pin.png'
import electionsCrowdMediumPinIcon from '@/assets/images/map/elections_crowd_medium_pin.png'
import electionsCrowdUnknownPinIcon from '@/assets/images/map/elections_crowd_unknown_pin.png'

import pinIcon from '@/assets/images/map/pin.png'
import selectedPinIcon from '@/assets/images/map/selected_pin.png'

export enum MarkerVariant {
  distinctPin = 'distinctPin',
  electionsCrowdBusyPin = 'elections_crowd_busy_pin',
  electionsCrowdCalmPin = 'elections_crowd_calm_pin',
  electionsCrowdMediumPin = 'elections_crowd_medium_pin',
  electionsCrowdUnknownPin = 'elections_crowd_unknown_pin',
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
  [MarkerVariant.electionsCrowdCalmPin]: Platform.select({
    ios: electionsCrowdCalmPinIcon,
    android: {uri: 'elections_crowd_calm_pin'},
  }),
  [MarkerVariant.electionsCrowdMediumPin]: Platform.select({
    ios: electionsCrowdMediumPinIcon,
    android: {uri: 'elections_crowd_medium_pin'},
  }),
  [MarkerVariant.electionsCrowdBusyPin]: Platform.select({
    ios: electionsCrowdBusyPinIcon,
    android: {uri: 'elections_crowd_busy_pin'},
  }),
  [MarkerVariant.electionsCrowdUnknownPin]: Platform.select({
    ios: electionsCrowdUnknownPinIcon,
    android: {uri: 'elections_crowd_unknown_pin'},
  }),
}
