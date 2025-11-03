import {Geojson, type LatLng} from 'react-native-maps'
import type {Feature} from 'geojson'
import {Map} from '@/components/features/map/Map'
import {Box} from '@/components/ui/containers/Box'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitZonesQuery} from '@/modules/parking/service'

export const ParkingSessionDetailsPermitZones = () => {
  const {report_code, permit_zone} = useCurrentParkingPermit()

  useSetScreenTitle(permit_zone.name)
  const {data, isLoading} = usePermitZonesQuery({report_code})

  if (!data || isLoading) {
    return null
  }

  const properties = data.geojson.features[0]?.properties
  const allCoords = getAllPolygonCoords(data.geojson.features)
  const region = getRegion(allCoords)

  return (
    <Box grow>
      <Map
        coordinates={allCoords}
        region={region}>
        <Geojson
          fillColor={getFillColor(
            String(properties?.fill ?? 'blue'),
            Number(properties?.['fill-opacity'] ?? 0.5),
          )}
          geojson={data.geojson}
        />
      </Map>
    </Box>
  )
}

const getFillColor = (fill: string, opacity: number) => {
  if (!['red', 'green', 'blue'].includes(fill)) {
    return fill
  }

  return `rgba(${fill === 'red' ? 255 : 0}, ${fill === 'green' ? 255 : 0}, ${fill === 'blue' ? 255 : 0}, ${opacity})`
}

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

const getRegion = (allCoords: LatLng[]) => {
  if (allCoords.length === 0) {
    return undefined
  }

  const latitudes = allCoords.map(coord => coord.latitude)
  const longitudes = allCoords.map(coord => coord.longitude)

  return {
    latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
    longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
    latitudeDelta: Math.max(...latitudes) - Math.min(...latitudes),
    longitudeDelta: Math.max(...longitudes) - Math.min(...longitudes),
  }
}
