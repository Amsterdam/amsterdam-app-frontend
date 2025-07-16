import {useState} from 'react'
import {Platform} from 'react-native'
import MapView, {Geojson} from 'react-native-maps'
import type {Feature} from 'geojson'
import {Box} from '@/components/ui/containers/Box'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitZonesQuery} from '@/modules/parking/service'

export const ParkingSessionDetailsPermitZones = () => {
  const [isMapReady, setIsMapReady] = useState(false)
  const currentPermit = useCurrentParkingPermit()

  useSetScreenTitle(currentPermit.permit_zone.name)
  const {data, isLoading} = usePermitZonesQuery(
    currentPermit.permit_zone.permit_zone_id,
  )

  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  if (!data || isLoading) {
    return null
  }

  const featureCollection = data
  const properties = featureCollection.features[0]?.properties
  const allCoords = getAllPolygonCoords(featureCollection.features)
  const initialRegion = getInitialRegion(allCoords)

  return (
    <Box grow>
      <MapView
        initialRegion={initialRegion}
        onMapReady={handleOnMapReady}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        showsUserLocation={isMapReady} // Workaround for Android to show user location after map is ready
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}>
        <Geojson
          fillColor={getFillColor(
            String(properties?.fill ?? 'blue'),
            Number(properties?.['fill-opacity'] ?? 0.5),
          )}
          geojson={featureCollection}
        />
      </MapView>
    </Box>
  )
}

const getFillColor = (fill: string, opacity: number) => {
  if (!['red', 'green', 'blue'].includes(fill)) {
    return fill
  }

  return `rgba(${fill === 'red' ? 255 : 0}, ${fill === 'green' ? 255 : 0}, ${fill === 'blue' ? 255 : 0}, ${opacity})`
}

type LatLng = {latitude: number; longitude: number}

const getAllPolygonCoords = (features: Feature[]): LatLng[] =>
  features
    .filter((feature: Feature) => feature.geometry?.type === 'Polygon')
    .flatMap((feature: Feature) => {
      if (feature.geometry && feature.geometry.type === 'Polygon') {
        return feature.geometry.coordinates[0].map(coord => ({
          latitude: coord[1],
          longitude: coord[0],
        }))
      }

      return []
    })

const getInitialRegion = (allCoords: LatLng[]) => {
  if (allCoords.length === 0) {
    return undefined
  }

  const lats = allCoords.map(c => c.latitude)
  const lngs = allCoords.map(c => c.longitude)
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
