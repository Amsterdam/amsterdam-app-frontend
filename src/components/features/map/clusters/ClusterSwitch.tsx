import {useCallback} from 'react'
import type {ClusterItem} from '@/components/features/map/types'
import type {Region} from 'react-native-maps'
import {ClusterMarker} from '@/components/features/map/clusters/ClusterMarker'
import {Marker} from '@/components/features/map/marker/Marker'

export const ClusterSwitch = ({
  item,
  onClusterPress,
}: {
  item: ClusterItem
  onClusterPress?: (region: Region) => void
}) => {
  const handlePress = useCallback(() => {
    if ('cluster_id' in item.properties) {
      const {getExpansionRegion} = item.properties
      const clusterRegion = getExpansionRegion()

      onClusterPress?.(clusterRegion)

      return
    }

    item.properties.onMarkerPress?.()
  }, [item.properties, onClusterPress])

  return (
    <Marker
      coordinate={{
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
      }}
      id={
        'cluster_id' in item.properties
          ? `cluster-${item.properties?.cluster_id}-${item.properties.point_count}`
          : `point-${item.properties?.id}`
      }
      onPress={handlePress}
      onSelect={handlePress}
      tracksViewChanges={false}
      variant={
        'cluster_id' in item.properties ? undefined : item.properties.variant
      }>
      {'cluster_id' in item.properties && (
        <ClusterMarker count={item.properties.point_count} />
      )}
    </Marker>
  )
}
