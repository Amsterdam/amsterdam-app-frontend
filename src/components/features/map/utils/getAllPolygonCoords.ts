import type {Feature, FeatureCollection} from 'geojson'
import type {LatLng} from 'react-native-maps'

export const getAllPolygonCoords = (geojson: FeatureCollection): LatLng[] =>
  geojson.features.flatMap(getPolygonCoords)

const getPolygonCoords = (feature: Feature): LatLng[] => {
  if (feature.geometry.type === 'Polygon') {
    return feature.geometry.coordinates.flat().map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }))
  }

  return []
}
