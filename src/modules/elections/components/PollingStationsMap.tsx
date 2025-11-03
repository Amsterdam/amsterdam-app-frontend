import {useEffect, useRef} from 'react'
import MapView, {Marker} from 'react-native-maps'
import {Map} from '@/components/features/map/Map'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Address} from '@/modules/address/types'
import {PollingStation} from '@/modules/elections/types'

const ANIMATION_DURATION = 0

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
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    if (mapRef.current && !!address?.coordinates) {
      mapRef.current.animateToRegion(
        {
          latitude: address?.coordinates.lat,
          longitude: address?.coordinates.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        ANIMATION_DURATION,
      )
    }
  }, [address, mapRef])

  if (isLoading) {
    return <PleaseWait testID="PollingStationsMapPleaseWait" />
  }

  if (!pollingStations || !pollingStations.length || isError) {
    return <SomethingWentWrong testID="PollingStationsMapSomethingWentWrong" />
  }

  return (
    <Map
      controls={[ControlVariant.location]}
      ref={mapRef}>
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
