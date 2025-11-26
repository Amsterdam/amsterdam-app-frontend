import type {ClusterItem} from '@/components/features/map/types'
import type {MapMarkerProps} from 'react-native-maps'
import {Cluster} from '@/components/features/map/clusters/Cluster'
import {Marker} from '@/components/features/map/marker/Marker'
import {MarkerVariant} from '@/components/features/map/marker/markers'
import {isCluster} from '@/components/features/map/utils/isCluster'

export type ClusterProps = {
  item: ClusterItem
} & Omit<MapMarkerProps, 'coordinate'>

export const ClusterSwitch = ({item, ...markerProps}: ClusterProps) => {
  if (!isCluster(item.properties)) {
    return (
      <Marker
        coordinate={{
          latitude: item.geometry.coordinates[1],
          longitude: item.geometry.coordinates[0],
        }}
        id={`point-${item.properties?.id}`}
        onPress={item.properties.onItemPress}
        onSelect={item.properties.onItemPress}
        variant={item.properties.variant}
        {...markerProps}
      />
    )
  }

  return (
    <Marker
      coordinate={{
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
      }}
      id={`cluster-${item.properties?.cluster_id}-${item.properties.point_count}`}
      variant={MarkerVariant.cluster}
      {...markerProps}>
      <Cluster count={item.properties.point_count} />
    </Marker>
  )
}
