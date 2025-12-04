import {useMemo} from 'react'
import {Geojson} from 'react-native-maps'
import {Map} from '@/components/features/map/Map'
import {ControlVariant} from '@/components/features/map/types'
import {getAllPolygonCoords} from '@/components/features/map/utils/getAllPolygonCoords'
import {getFillColor} from '@/components/features/map/utils/getFillColor'
import {getRegionFromCoords} from '@/components/features/map/utils/getRegionFromCoords'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ParkingPermitZoneMapMarkers} from '@/modules/parking/components/permit-zone/ParkingPermitZoneMapMarkers'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {usePermitZonesQuery} from '@/modules/parking/service'

export const ParkingPermitZoneMap = () => {
  const {report_code} = useCurrentParkingPermit()
  const {setRegion, mapRef} = usePermitMapContext()

  const {
    data: permitZoneData,
    isLoading,
    isError,
  } = usePermitZonesQuery(report_code)

  const initialRegion = useMemo(() => {
    if (!permitZoneData?.geojson || !('features' in permitZoneData.geojson)) {
      return
    }

    const allCoords = getAllPolygonCoords(permitZoneData.geojson)

    return getRegionFromCoords(allCoords)
  }, [permitZoneData])

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitZoneMapPleaseWait" />
  }

  if (
    isError ||
    !permitZoneData?.geojson ||
    !('features' in permitZoneData.geojson) ||
    Object.keys(permitZoneData.geojson).length === 0
  ) {
    return (
      <Box>
        <SomethingWentWrong testID="ParkingPermitZoneMapSomethingWentWrong" />
      </Box>
    )
  }

  const properties = permitZoneData?.geojson.features[0]?.properties

  return (
    <Map
      controls={[ControlVariant.location]}
      initialRegion={initialRegion}
      onRegionChangeComplete={setRegion}
      ref={mapRef}>
      <Geojson
        fillColor={getFillColor(
          String(properties?.fill ?? 'blue'),
          Number(properties?.['fill-opacity'] ?? 0.5),
        )}
        geojson={permitZoneData.geojson}
      />
      <ParkingPermitZoneMapMarkers />
    </Map>
  )
}
