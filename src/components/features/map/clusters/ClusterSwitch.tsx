import {memo} from 'react'
import type {ClusterItem} from '@/components/features/map/types'
import {Cluster} from '@/components/features/map/clusters/Cluster'
import {Marker} from '@/components/features/map/marker/Marker'
import {checkClusterPropsHaveChanged} from '@/components/features/map/utils/checkClusterPropsHaveChanged'
import {isCluster} from '@/components/features/map/utils/isCluster'

type ClusterProps = {
  item: ClusterItem
}

export const ClusterSwitch = memo(
  ({item}: ClusterProps) => (
    <Marker
      coordinate={{
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
      }}
      key={
        isCluster(item.properties)
          ? `cluster-${item.properties?.cluster_id}`
          : `point-${item.properties?.id}`
      }
      tracksViewChanges={false}>
      {isCluster(item.properties) && (
        <Cluster count={item.properties.point_count} />
      )}
    </Marker>
  ),
  checkClusterPropsHaveChanged,
)
