import {Marker} from 'react-native-maps'
import {Map} from '@/components/features/map/Map'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Address} from '@/modules/address/types'
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
  const coordinates = address?.coordinates

  if (isLoading) {
    return <PleaseWait testID="PollingStationsMapPleaseWait" />
  }

  if (!pollingStations || !pollingStations.length || isError) {
    return <SomethingWentWrong testID="PollingStationsMapSomethingWentWrong" />
  }

  return (
    <Map
      controls={[ControlVariant.location]}
      region={{
        latitude: coordinates?.lat ?? 52.3753,
        longitude: coordinates?.lon ?? 4.9044,
        latitudeDelta: coordinates ? 0.01 : 0.0922,
        longitudeDelta: coordinates ? 0.01 : 0.0421,
      }}>
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
        />
      ))}
    </Map>
  )
}
