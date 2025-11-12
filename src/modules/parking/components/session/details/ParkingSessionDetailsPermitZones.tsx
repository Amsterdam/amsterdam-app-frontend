import {Geojson} from 'react-native-maps'
import type {FeatureCollection} from 'geojson'
import {Map} from '@/components/features/map/Map'
import {getAllPolygonCoords} from '@/components/features/map/utils/getAllPolygonCoords'
import {getFillColor} from '@/components/features/map/utils/getFillColor'
import {getRegionFromCoords} from '@/components/features/map/utils/getRegionFromCoords'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitZonesQuery} from '@/modules/parking/service'

export const ParkingSessionDetailsPermitZones = () => {
  const {report_code, permit_zone} = useCurrentParkingPermit()

  useSetScreenTitle(permit_zone.name)
  const {data, isLoading, isError} = usePermitZonesQuery(report_code)

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionDetailsPermitZonesPleaseWait" />
  }

  if (!data?.geojson || Object.keys(data.geojson).length === 0 || isError) {
    return (
      <Box>
        <SomethingWentWrong testID="ParkingSessionDetailsPermitZonesSomethingWentWrong" />
      </Box>
    )
  }

  const properties = data.geojson.features[0]?.properties
  const allCoords = getAllPolygonCoords(data.geojson)
  const region = getRegionFromCoords(allCoords)

  return (
    <Map region={region}>
      <Geojson
        fillColor={getFillColor(
          String(properties?.fill ?? 'blue'),
          Number(properties?.['fill-opacity'] ?? 0.5),
        )}
        geojson={data.geojson as FeatureCollection}
      />
    </Map>
  )
}
