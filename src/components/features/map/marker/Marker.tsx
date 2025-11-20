import {memo} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Marker as MarkerRN, type MapMarkerProps} from 'react-native-maps'
import {
  MARKER_IMAGES,
  type MarkerVariants,
} from '@/components/features/map/marker/markers'

type MarkerProps = {
  variant?: MarkerVariants
} & MapMarkerProps

export const Marker = memo(
  ({variant = 'pin', ...markerProps}: MarkerProps) => (
    <MarkerRN
      image={MARKER_IMAGES[variant]}
      {...markerProps}
    />
  ),
  (prev: MarkerProps, next: MarkerProps) =>
    prev.coordinate.latitude === next.coordinate.latitude &&
    prev.coordinate.longitude === next.coordinate.longitude &&
    prev.variant === next.variant,
)
