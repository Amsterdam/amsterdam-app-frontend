import {useContext, useState} from 'react'
import {Platform, StyleSheet} from 'react-native'
import MapView, {Geojson} from 'react-native-maps'
import {useAddress} from '@/modules/address/slice'
import {PollingStationContext} from '@/modules/elections/providers/PollingStation.context'
import {PollingStation} from '@/modules/elections/types'
import {PollingStationMarkerIcon} from '@/modules/vote/components/icons/PollingStationMarkerIcon'

type Props = {
  pollingStations?: PollingStation[]
}

export const PollingStationsMap = ({pollingStations}: Props) => {
  const [isMapReady, setIsMapReady] = useState(false)
  const address = useAddress()
  const {onPressListItem} = useContext(PollingStationContext)
  const coordinates = address?.coordinates
  const styles = createStyles()

  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  if (!pollingStations || !pollingStations.length) {
    return null
  }

  return (
    <MapView
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
            properties: {
              ...station,
            },
            geometry: {
              type: 'Point',
              coordinates: [station.position.lng, station.position.lat],
            },
          })),
        }}
        markerComponent={<PollingStationMarkerIcon />}
        onPress={e => {
          e.feature.properties &&
            onPressListItem(e.feature.properties as PollingStation)
        }}
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
