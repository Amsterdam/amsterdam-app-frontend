// eslint-disable-next-line no-restricted-imports
import {Marker as MarkerRN, type MapMarkerProps} from 'react-native-maps'
import {
  MARKER_IMAGES,
  type MarkerVariants,
} from '@/components/features/map/marker/markers'

type MarkerProps = {
  variant?: MarkerVariants
} & MapMarkerProps
export const Marker = ({variant = 'pin', ...markerProps}: MarkerProps) => (
  <MarkerRN
    image={MARKER_IMAGES[variant]}
    {...markerProps}
  />
)
