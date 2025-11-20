import {useState} from 'react'
import {Map} from '@/components/features/map/Map'
import {Marker} from '@/components/features/map/marker/Marker'
import {ControlVariant} from '@/components/features/map/types'
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
      onRegionChangeComplete={setRegion}
      region={region}>
      {pollingStations.map(station => (
        <Marker
          accessibilityLabel={station.name + ', ' + station.address1}
          coordinate={{
            latitude: station.position.lat,
            longitude: station.position.lng,
          }}
          key={station.id}
          onPress={() => onPress(station.id)}
          onSelect={() => onPress(station.id)}
          variant={
            selectedPollingStationId === station.id ? 'selectedPin' : 'pin'
          }
        />
      ))}
    </Map>
  )
}
