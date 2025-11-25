import {skipToken} from '@reduxjs/toolkit/query'
import {FeatureCollection} from 'geojson'
import {useMemo} from 'react'
import {Geojson} from 'react-native-maps'
import type {ParkingMachine} from '@/modules/parking/types'
import {Map} from '@/components/features/map/Map'
import {Marker} from '@/components/features/map/marker/Marker'
import {getAllPolygonCoords} from '@/components/features/map/utils/getAllPolygonCoords'
import {getFillColor} from '@/components/features/map/utils/getFillColor'
import {getRegionFromCoords} from '@/components/features/map/utils/getRegionFromCoords'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetMarkerVariant} from '@/modules/parking/hooks/useGetMarkerVariant'
import {
  usePermitZonesQuery,
  useParkingMachinesQuery,
} from '@/modules/parking/service'

export const ParkingPermitZoneMap = ({
  onSelectParkingMachine,
}: {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
}) => {
  const {report_code} = useCurrentParkingPermit()
  const getMarkerVariant = useGetMarkerVariant()

  const {
    data: permitZoneData,
    isLoading,
    isError,
  } = usePermitZonesQuery(report_code)

  const {data: parkingMachinesData} = useParkingMachinesQuery(
    permitZoneData ? undefined : skipToken,
  )

  const {region, properties} = useMemo(() => {
    if (!permitZoneData) {
      return {}
    }

    const allCoords = getAllPolygonCoords(permitZoneData.geojson)

    return {
      region: getRegionFromCoords(allCoords),
      properties: permitZoneData?.geojson.features[0]?.properties,
    }
  }, [permitZoneData])

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitZoneMapPleaseWait" />
  }

  if (
    isError ||
    !permitZoneData?.geojson ||
    Object.keys(permitZoneData.geojson).length === 0
  ) {
    return (
      <Box>
        <SomethingWentWrong testID="ParkingPermitZoneMapSomethingWentWrong" />
      </Box>
    )
  }

  return (
    <Map region={region}>
      <Geojson
        fillColor={getFillColor(
          String(properties?.fill ?? 'blue'),
          Number(properties?.['fill-opacity'] ?? 0.5),
        )}
        geojson={permitZoneData.geojson as FeatureCollection}
      />
      {!!parkingMachinesData?.length &&
        parkingMachinesData.map(({lat, lon, id, address}) => (
          <Marker
            accessibilityLabel={`Parkeerautomaat ${id}${address ?? ' - ' + address}`}
            coordinate={{
              latitude: lat,
              longitude: lon,
            }}
            key={id}
            onPress={() => onSelectParkingMachine(id)}
            onSelect={() => onSelectParkingMachine(id)}
            variant={getMarkerVariant(id)}
          />
        ))}
    </Map>
  )
}
