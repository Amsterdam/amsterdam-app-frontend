import {memo} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Marker as MarkerRN, type MapMarkerProps} from 'react-native-maps'
import {
  MARKER_IMAGES,
  MarkerVariant,
} from '@/components/features/map/marker/markers'
import {checkMarkerPropsHaveChanged} from '@/components/features/map/utils/checkMarkerPropsHaveChanged'

export type MarkerProps = {
  variant?: MarkerVariant
} & Omit<MapMarkerProps, 'icon' | 'image'>

const DEFAULT_HIT_SLOP = 20

export const Marker = memo(
  ({variant, hitSlop = DEFAULT_HIT_SLOP, ...markerProps}: MarkerProps) => (
    <MarkerRN
      hitSlop={hitSlop}
      image={variant ? MARKER_IMAGES[variant] : undefined}
      {...markerProps}
    />
  ),
  checkMarkerPropsHaveChanged,
)
