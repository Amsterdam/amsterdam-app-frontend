// eslint-disable-next-line no-restricted-imports
import {Marker as MarkerRN, type LatLng} from 'react-native-maps'
import {
  MARKER_IMAGES,
  type MarkerVariants,
} from '@/components/features/map/marker/markers'

type MarkerProps = {
  coordinates: LatLng
  variant?: MarkerVariants
}
export const Marker = ({coordinates, variant = 'pin'}: MarkerProps) => (
  <MarkerRN
    coordinate={coordinates}
    image={MARKER_IMAGES[variant]}
  />
)
