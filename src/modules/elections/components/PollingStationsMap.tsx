import {useRef, useState} from 'react'
import type MapView from 'react-native-maps'
import {Map} from '@/components/features/map/Map'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {ControlVariant} from '@/components/features/map/types'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Address} from '@/modules/address/types'
import {useSelectedPollingStationId} from '@/modules/elections/slice'
import {PollingStation} from '@/modules/elections/types'

type Props = {
  address?: Address
  isError: boolean
  isLoading: boolean
  onPress: (id: PollingStation['id']) => void
  pollingStations?: PollingStation[]
}

export const PollingStationsMap = ({
  address,
  isLoading,
  isError,
  onPress,
  pollingStations,
}: Props) => {
  const selectedPollingStationId = useSelectedPollingStationId()
  const markerVariant = getMarkerVariant(selectedPollingStationId)
  const mapRef = useRef<MapView>(null)
  const [region, setRegion] = useState(
    address?.coordinates
      ? {
          latitude: address?.coordinates.lat,
          longitude: address?.coordinates.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      : undefined,
  )

  if (isLoading) {
    return <PleaseWait testID="PollingStationsMapPleaseWait" />
  }

  if (!pollingStations || !pollingStations.length || isError) {
    return <SomethingWentWrong testID="PollingStationsMapSomethingWentWrong" />
  }

  return (
    <Map
      controls={[ControlVariant.location]}
      initialRegion={region}
      onRegionChangeComplete={setRegion}
      ref={mapRef}>
      <Clusterer
        data={pollingStations.map(({position, id, ...props}) => ({
          type: 'Feature',
          properties: {
            ...props,
            id: String(id),
            variant: markerVariant(id),
            onItemPress: () => onPress(id),
          },

          geometry: {
            type: 'Point',
            coordinates: [position.lng, position.lat],
          },
        }))}
        onClusterPress={clusterRegion =>
          mapRef.current?.animateToRegion(clusterRegion)
        }
        region={region}
      />
    </Map>
  )
}
