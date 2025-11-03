import {ReactNode, useRef, useState} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import MapView, {MapViewProps, type LatLng} from 'react-native-maps'
import {MapControls} from '@/components/features/map/MapControls'
import {ControlVariant} from '@/components/features/map/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  controls?: ControlVariant[]
  /**
   * Array of coordinates to fit the map to
   */
  coordinates?: LatLng[]
} & MapViewProps

export const Map = ({
  children,
  controls,
  coordinates,
  ...mapViewProps
}: Props) => {
  const [isMapReady, setIsMapReady] = useState(false)
  const styles = useThemable(createStyles)
  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  const mapRef = useRef<MapView | null>(null)
  const onLayout = () => {
    if (Platform.OS === 'android') {
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        },
      })
    }
  }

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
        moveOnMarkerPress={false}
        onLayout={onLayout}
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
