import {useState} from 'react'
import {Platform, StyleSheet} from 'react-native'
import MapView, {Geojson} from 'react-native-maps'
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
  const [isMapReady, setIsMapReady] = useState(false)

  const coordinates = address?.coordinates
  const styles = createStyles()

  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  if (isLoading) {
    return <PleaseWait testID="PollingStationsMapPleaseWait" />
  }

  if (!pollingStations || !pollingStations.length || isError) {
    return <SomethingWentWrong testID="PollingStationsMapSomethingWentWrong" />
  }

  return (
    <MapView
      collapsable={false}
      initialRegion={{
        latitude: coordinates?.lat ?? 52.3753,
        longitude: coordinates?.lon ?? 4.9044,
        latitudeDelta: coordinates ? 0.01 : 0.0922,
        longitudeDelta: coordinates ? 0.01 : 0.0421,
      }}
      moveOnMarkerPress={false}
      onMapReady={handleOnMapReady}
      provider={Platform.OS === 'android' ? 'google' : undefined}
      showsBuildings={false}
      showsUserLocation={isMapReady} // Workaround for Android to show user location after map is ready
      style={styles.mapView}>
      <Geojson
        geojson={{
          type: 'FeatureCollection',
          features: pollingStations.map(station => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [station.position.lng, station.position.lat],
            },
            properties: {
              ...station,
            },
          })),
        }}
        onPress={e =>
          e.feature.properties &&
          onPress(e.feature.properties.id as PollingStation['id'])
        }
      />
    </MapView>
  )
}

const createStyles = () =>
  StyleSheet.create({
    mapView: {
      flex: 1,
    },
  })
