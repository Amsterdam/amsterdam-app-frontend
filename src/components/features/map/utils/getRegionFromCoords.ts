import type {LatLng} from 'react-native-maps'

export const getRegionFromCoords = (coordinates: LatLng[]) => {
  if (coordinates.length === 0) {
    return undefined
  }

  const lats = coordinates.map(c => c.latitude)
  const lngs = coordinates.map(c => c.longitude)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max(0.01, (maxLat - minLat) * 1.2),
    longitudeDelta: Math.max(0.01, (maxLng - minLng) * 1.2),
  }
}
