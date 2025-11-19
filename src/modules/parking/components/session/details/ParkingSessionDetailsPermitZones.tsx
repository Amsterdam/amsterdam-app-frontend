import {skipToken} from '@reduxjs/toolkit/query'
// import {Image, Platform, type ImageURISource} from 'react-native'
import {Geojson, Marker} from 'react-native-maps'
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
import {
  useParkingMachinesQuery,
  usePermitZonesQuery,
} from '@/modules/parking/service'

// type MarkerVariants = 'pin'

// const MARKER_IMAGES: Record<MarkerVariants, ImageURISource | undefined> = {
//   pin: Platform.select({
//     ios: {uri: 'pin'},
//     android: {uri: 'pin'},
//   }),
// }

export const ParkingSessionDetailsPermitZones = () => {
  const {report_code, permit_zone} = useCurrentParkingPermit()

  useSetScreenTitle(permit_zone.name)
  const {data, isLoading, isError} = usePermitZonesQuery(report_code)

  const {data: permitZoneData} = usePermitZonesQuery(report_code)

  const {data: parkingMachinesData} = useParkingMachinesQuery(
    permitZoneData ? undefined : skipToken,
  )

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

  // console.log(
  //   Platform.OS,
  //   Image.resolveAssetSource(require('@/assets/images/map/pin.png')),
  // )

  return (
    <Map region={region}>
      <Geojson
        fillColor={getFillColor(
          String(properties?.fill ?? 'blue'),
          Number(properties?.['fill-opacity'] ?? 0.5),
        )}
        geojson={data.geojson as FeatureCollection}
      />
      {!!parkingMachinesData?.length &&
        parkingMachinesData.map(({lat, lon, id}) => (
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lon,
            }}
            // image={MARKER_IMAGES.pin}
            key={id}
          />
        ))}
    </Map>
  )
}
