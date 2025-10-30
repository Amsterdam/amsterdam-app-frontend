import {useEffect, useMemo, useRef, useState} from 'react'
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
  strokeWidth: number
}

type LatLng = {latitude: number; longitude: number}

type PermitZoneFeature = Feature<GeoJSONPolygon, PermitZoneProps>

export const ParkingSessionDetailsPermitZones = () => {
  const [isMapReady, setIsMapReady] = useState(false)
  const {report_code, permit_zone} = useCurrentParkingPermit()
  const mapRef = useRef<MapView>(null)

  useSetScreenTitle(permit_zone.name)
  const {data, isLoading, isError} = usePermitZonesQuery({report_code})
  const styles = useThemable(createStyles)

  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  const mappedFeatures = useMemo(() => {
    if (!data) {
      return []
    }

    return data.geojson.features.reduce(
      (features: PermitZoneFeature[], currentFeature: Feature) => {
        if (currentFeature.geometry?.type !== 'Polygon') {
          return features
        }

        const variant =
          currentFeature.properties?.fill === 'red' ? 'forbidden' : 'permitZone'

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
            strokeWidth: styles[variant].borderWidth,
          },
        }

        return [...features, feature]
      },
      [],
    )
  }, [data, styles])

  const allCoords = getAllPolygonCoords(mappedFeatures)

  useEffect(() => {
    if (mapRef.current && allCoords?.length) {
      mapRef.current.fitToCoordinates(allCoords, {
        edgePadding: {
          top: 40,
          bottom: 40,
          left: 40,
          right: 40,
        },
        animated: false,
      })
    }
  }, [mapRef, allCoords])

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionDetailsPermitZonesPleaseWait" />
  }

  if (isError || !mappedFeatures?.length) {
    return (
      <SomethingWentWrong testID="ParkingSessionDetailsPermitZonesSomethingWentWrong" />
    )
  }

  return (
    <Box
      grow
      insetHorizontal="no">
      <MapView
        onMapReady={handleOnMapReady}
        provider={Platform.OS === 'android' ? 'google' : undefined}
        ref={mapRef}
        showsUserLocation={isMapReady} // Workaround for Android to show user location after map is ready
        style={styles.map}>
        {mappedFeatures?.map((feature, index) => (
          <Polygon
            coordinates={getPolygonCoords(feature)}
            fillColor={feature.properties.fillColor}
            key={feature.id || `${feature.type}_${index}`}
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
      borderWidth: 3,
    },
    forbidden: {
      backgroundColor: color.map.permitZone.forbidden.fillColor,
      borderColor: color.map.permitZone.forbidden.stroke,
      borderWidth: 3,
    },
  })

const getAllPolygonCoords = (features: PermitZoneFeature[]): LatLng[] =>
  features.flatMap(getPolygonCoords)

const getPolygonCoords = (feature: PermitZoneFeature): LatLng[] =>
  feature.geometry.coordinates[0].map(([longitude, latitude]) => ({
    latitude,
    longitude,
  }))
