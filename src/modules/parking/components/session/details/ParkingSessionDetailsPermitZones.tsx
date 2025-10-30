import {useMemo, useState} from 'react'
import {Platform, StyleSheet} from 'react-native'
import MapView, {Polygon} from 'react-native-maps'
import type {Theme} from '@/themes/themes'
import type {Feature, Polygon as GeoJSONPolygon} from 'geojson'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitZonesQuery} from '@/modules/parking/service'
import {useThemable} from '@/themes/useThemable'

type PermitZoneProps = {
  fillColor: string
  stroke: string
}

type LatLng = {latitude: number; longitude: number}

type PermitZoneFeature = Feature<GeoJSONPolygon, PermitZoneProps>

export const ParkingSessionDetailsPermitZones = () => {
  const [isMapReady, setIsMapReady] = useState(false)
  const {report_code, permit_zone} = useCurrentParkingPermit()

  useSetScreenTitle(permit_zone.name)
  const {data, isLoading, isError} = usePermitZonesQuery({report_code})
  const styles = useThemable(createStyles)
  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  const mappedFeatures = useMemo(
    () =>
      data?.geojson.features.reduce(
        (features: PermitZoneFeature[], currentFeature: Feature) => {
          if (currentFeature.geometry?.type !== 'Polygon') {
            return features
          }

          const variant =
            currentFeature.properties?.fill === 'red'
              ? 'forbidden'
              : 'permitZone'

          const feature: PermitZoneFeature = {
            ...currentFeature,
            geometry: {
              ...currentFeature.geometry,
              type: 'Polygon',
            },
            properties: {
              ...currentFeature.properties,
              fillColor: styles[variant].backgroundColor,
              stroke: styles[variant].borderColor,
            },
          }

          return [...features, feature]
        },
        [],
      ),
    [data, styles],
  )

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionDetailsPermitZonesPleaseWait" />
  }

  if (isError || !mappedFeatures?.length) {
    return (
      <SomethingWentWrong testID="ParkingSessionDetailsPermitZonesSomethingWentWrong" />
    )
  }

  const allCoords = getAllPolygonCoords(mappedFeatures)
  const initialRegion = getInitialRegion(allCoords)

  return (
    <Box
      grow
      insetHorizontal="no">
      <MapView
        initialRegion={initialRegion}
        onMapReady={handleOnMapReady}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        showsUserLocation={isMapReady} // Workaround for Android to show user location after map is ready
        style={styles.map}>
        {mappedFeatures?.map((feature, index) => (
          <Polygon
            coordinates={feature.geometry.coordinates[0].map(
              ([longitude, latitude]) => ({latitude, longitude}),
            )}
            fillColor={feature.properties.fillColor}
            key={feature.id || index}
            strokeColor={feature.properties.stroke}
            strokeWidth={3}
          />
        ))}
      </MapView>
    </Box>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    map: {
      flex: 1,
    },
    permitZone: {
      backgroundColor: color.map.permitZone.allowed.fillColor,
      borderColor: color.map.permitZone.allowed.stroke,
    },
    forbidden: {
      backgroundColor: color.map.permitZone.forbidden.fillColor,
      borderColor: color.map.permitZone.forbidden.stroke,
    },
  })

const getAllPolygonCoords = (features: PermitZoneFeature[]): LatLng[] =>
  features.flatMap(feature =>
    feature.geometry.coordinates[0].map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    })),
  )

const getInitialRegion = (allCoords: LatLng[]) => {
  if (allCoords.length === 0) {
    return undefined
  }

  const lats = allCoords.map(c => c.latitude)
  const lngs = allCoords.map(c => c.longitude)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max(0.01, (maxLat - minLat) * 1.2),
    longitudeDelta: Math.max(0.01, (maxLng - minLng) * 1.2),
  }
}
