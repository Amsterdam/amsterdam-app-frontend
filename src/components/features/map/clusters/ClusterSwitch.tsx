import {memo} from 'react'
import type {ClusterItem} from '@/components/features/map/types'
import type {MapMarkerProps} from 'react-native-maps'
import {Cluster} from '@/components/features/map/clusters/Cluster'
import {Marker} from '@/components/features/map/marker/Marker'
import {MarkerVariant} from '@/components/features/map/marker/markers'
import {checkClusterPropsHaveChanged} from '@/components/features/map/utils/checkClusterPropsHaveChanged'
import {isCluster} from '@/components/features/map/utils/isCluster'
import {useGetMarkerVariant} from '@/modules/parking/hooks/useGetMarkerVariant'

export type ClusterProps = {
  item: ClusterItem
} & Omit<MapMarkerProps, 'coordinate' | 'tracksViewChanges'>

export const ClusterSwitch = memo(({item, ...markerProps}: ClusterProps) => {
  const getMarkerVariant = useGetMarkerVariant()

  const onPress = () => {
    if (markerProps.onPress) {
      onPress()
    }

    if (!isCluster(item.properties)) {
      item.properties.onItemPress?.()
    }
  }

  return (
    <Marker
      coordinate={{
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
      }}
      onPress={onPress}
      onSelect={onPress}
      tracksViewChanges={false}
      variant={
        isCluster(item.properties)
          ? MarkerVariant.cluster
          : getMarkerVariant(item.properties.id)
      }
      {...markerProps}>
      {isCluster(item.properties) && (
        <Cluster count={item.properties.point_count} />
      )}
    </Marker>
  )
}, checkClusterPropsHaveChanged)
