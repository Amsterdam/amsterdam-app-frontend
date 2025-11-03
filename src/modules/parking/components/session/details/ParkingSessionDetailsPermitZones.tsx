import {useRef} from 'react'
import MapView, {Geojson, type LatLng} from 'react-native-maps'
import type {Feature} from 'geojson'
import {Map} from '@/components/features/map/Map'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitZonesQuery} from '@/modules/parking/service'

export const ParkingSessionDetailsPermitZones = () => {
  const {report_code, permit_zone} = useCurrentParkingPermit()

  useSetScreenTitle(permit_zone.name)
  const {data, isLoading} = usePermitZonesQuery({report_code})
  const mapRef = useRef<MapView>(null)

  if (!data || isLoading) {
    return null
  }

  const properties = data.geojson.features[0]?.properties
  const allCoords = getAllPolygonCoords(data.geojson.features)

  const onLayout = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(allCoords, {
        edgePadding: {
          left: 40,
          right: 40,
          top: 40,
          bottom: 40,
        },
        animated: false,
      })
    }
  }

  return (
    <Map
      onLayout={onLayout}
      ref={mapRef}>
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
