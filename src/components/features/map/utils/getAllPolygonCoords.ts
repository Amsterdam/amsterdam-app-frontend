import type {PermitZoneGeoJsonResponse} from '@/modules/parking/types'
import type {Feature} from 'geojson'
import type {LatLng} from 'react-native-maps'

export const getAllPolygonCoords = (
  geojson: PermitZoneGeoJsonResponse['geojson'],
): LatLng[] => geojson.features?.flatMap(getPolygonCoords)

const getPolygonCoords = (feature: Feature): LatLng[] => {
  if (feature.geometry.type === 'Polygon') {
    return feature.geometry.coordinates.flat().map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }))
  }

  return []
}
