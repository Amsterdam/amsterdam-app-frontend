import {useEffect, useRef, useState, type PropsWithChildren} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import MapView, {MapViewProps, type Region} from 'react-native-maps'
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

const ANIMATION_DURATION = 0

type Props = PropsWithChildren<{
  controls?: ControlVariant[]
}> &
  MapViewProps

export const Map = ({children, controls, region, ...mapViewProps}: Props) => {
  const [isMapReady, setIsMapReady] = useState(false)
  const mapRef = useRef<MapView>(null)

  const styles = useThemable(createStyles)

  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  useEffect(() => {
    if (isMapReady && region) {
      mapRef.current?.animateToRegion(region as Region, ANIMATION_DURATION)
    }
  }, [isMapReady, region])

  return (
    <View style={styles.container}>
      {!!controls?.length && (
        <View style={styles.controls}>
          <MapControls
            mapRef={mapRef}
            variants={controls}
          />
        </View>
      )}
      <MapView
        collapsable={false}
        initialRegion={INITIAL_REGION} // Default initial region is overview of Amsterdam.
        moveOnMarkerPress={false}
        onMapReady={handleOnMapReady}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        ref={mapRef}
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
