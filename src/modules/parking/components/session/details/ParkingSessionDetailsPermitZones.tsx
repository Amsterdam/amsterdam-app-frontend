import {Geojson, type LatLng} from 'react-native-maps'
import type {Feature} from 'geojson'
import {Map} from '@/components/features/map/Map'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitZonesQuery} from '@/modules/parking/service'

export const ParkingSessionDetailsPermitZones = () => {
  const {report_code, permit_zone} = useCurrentParkingPermit()

  useSetScreenTitle(permit_zone.name)
  const {data, isLoading} = usePermitZonesQuery(report_code)

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionDetailsPermitZonesPleaseWait" />
  }

  if (!data) {
    return (
      <SomethingWentWrong testID="ParkingSessionDetailsPermitZonesSomethingWentWrong" />
    )
  }

  const properties = data.geojson.features[0]?.properties
  const allCoords = getAllPolygonCoords(data.geojson.features)
  const region = getInitialRegion(allCoords)

  return (
    <Map region={region}>
      <Geojson
        fillColor={getFillColor(
          String(properties?.fill ?? 'blue'),
          Number(properties?.['fill-opacity'] ?? 0.5),
        )}
        geojson={data.geojson}
      />
    </Map>
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
      if (feature.geometry?.type === 'Polygon') {
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
