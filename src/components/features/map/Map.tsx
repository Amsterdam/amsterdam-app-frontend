import {useState, type PropsWithChildren, type RefObject} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import MapView, {MapViewProps} from 'react-native-maps'
import {MapControls} from '@/components/features/map/MapControls'
import {ControlVariant} from '@/components/features/map/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const INITIAL_REGION = {
  latitude: 52.3753,
  longitude: 4.8964,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

type ControlProps = {
  controls: ControlVariant[]
  ref: RefObject<MapView | null>
}

type DefaultProps = {
  controls?: never
  ref?: RefObject<MapView | null>
}
type Props = PropsWithChildren<ControlProps | DefaultProps> & MapViewProps

export const Map = ({children, controls, ref, ...mapViewProps}: Props) => {
  const [isMapReady, setIsMapReady] = useState(false)

  const styles = useThemable(createStyles)

  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  return (
    <View style={styles.container}>
      {!!controls?.length && (
        <View style={styles.controls}>
          <MapControls
            mapRef={ref}
            variants={controls}
          />
        </View>
      )}
      <MapView
        collapsable={false}
        moveOnMarkerPress={false}
        onMapReady={handleOnMapReady}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        ref={ref}
        region={INITIAL_REGION}
        showsBuildings={false}
        showsMyLocationButton={false}
        showsUserLocation={isMapReady} // Workaround for Android to show user location after map is ready
        style={styles.mapView}
        {...mapViewProps}>
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
