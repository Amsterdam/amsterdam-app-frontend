import {ReactNode, useState} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import MapView from 'react-native-maps'
import {MapControls} from '@/components/features/map/MapControls'
import {ControlVariant} from '@/components/features/map/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  controls?: ControlVariant[]
  coordinates?: {
    lat: number
    lon: number
  }
}

export const Map = ({children, controls, coordinates}: Props) => {
  const [isMapReady, setIsMapReady] = useState(false)
  const styles = useThemable(createStyles)
  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  return (
    <View style={styles.container}>
      {!!controls?.length && (
        <View style={styles.controls}>
          <MapControls variants={controls} />
        </View>
      )}
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
        {children}
      </MapView>
    </View>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    controls: {
      position: 'absolute',
      top: size.spacing.md,
      right: size.spacing.md,
      zIndex: 1,
    },
    mapView: {
      flex: 1,
    },
  })
