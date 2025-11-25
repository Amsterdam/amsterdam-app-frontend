import {memo} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Marker as MarkerRN, type MapMarkerProps} from 'react-native-maps'
import {
  MARKER_IMAGES,
  MarkerVariant,
} from '@/components/features/map/marker/markers'

type MarkerProps = {
  variant?: MarkerVariant
} & MapMarkerProps

const DEFAULT_HIT_SLOP = 20

export const Marker = memo(
  ({
    variant = MarkerVariant.pin,
    hitSlop = DEFAULT_HIT_SLOP,
    ...markerProps
  }: MarkerProps) => (
    <MarkerRN
      hitSlop={hitSlop}
      image={MARKER_IMAGES[variant]}
      {...markerProps}
    />
  ),
  (prev: MarkerProps, next: MarkerProps) =>
    prev.coordinate.latitude === next.coordinate.latitude &&
    prev.coordinate.longitude === next.coordinate.longitude &&
    prev.variant === next.variant,
)
