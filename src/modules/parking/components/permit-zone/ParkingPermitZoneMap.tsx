import {skipToken} from '@reduxjs/toolkit/query'
import {FeatureCollection} from 'geojson'
import {useState} from 'react'
import {Geojson, type Region} from 'react-native-maps'
import {Map} from '@/components/features/map/Map'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {getAllPolygonCoords} from '@/components/features/map/utils/getAllPolygonCoords'
import {getFillColor} from '@/components/features/map/utils/getFillColor'
import {getRegionFromCoords} from '@/components/features/map/utils/getRegionFromCoords'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {
  usePermitZonesQuery,
  useParkingMachinesQuery,
} from '@/modules/parking/service'

export const ParkingPermitZoneMap = () => {
  const {report_code} = useCurrentParkingPermit()
  const {onSelectParkingMachine} = usePermitMapContext()

  const [region, setRegion] = useState<Region | undefined>()

  const {
    data: permitZoneData,
    isLoading,
    isError,
  } = usePermitZonesQuery(report_code)

  const {data: parkingMachinesData} = useParkingMachinesQuery(
    permitZoneData ? undefined : skipToken,
  )

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

  const allCoords = getAllPolygonCoords(permitZoneData.geojson)
  const properties = permitZoneData?.geojson.features[0]?.properties
  const initialRegion = getRegionFromCoords(allCoords)

  return (
    <Map
      onRegionChangeComplete={setRegion}
      region={region ?? initialRegion}>
      <Geojson
        fillColor={getFillColor(
          String(properties?.fill ?? 'blue'),
          Number(properties?.['fill-opacity'] ?? 0.5),
        )}
        geojson={permitZoneData.geojson as FeatureCollection}
      />

      {parkingMachinesData?.length && (
        <Clusterer
          data={parkingMachinesData.map(({lon, lat, ...props}) => ({
            type: 'Feature',
            properties: {
              ...props,
              onItemPress: () => onSelectParkingMachine(props.id),
            },
            geometry: {type: 'Point', coordinates: [lon, lat]},
          }))}
          region={region}
        />
      )}
    </Map>
  )
}
