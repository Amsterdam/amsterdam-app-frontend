import type {ClusterProps} from '@/components/features/map/clusters/ClusterSwitch'
import {isCluster} from '@/components/features/map/utils/isCluster'

/**
 *
 * @param previousClusterProps
 * @param nextClusterProps
 * @returns ```true``` if unchanged, ```false``` if changed
 */
export const checkClusterPropsHaveChanged = (
  {item: prevItem}: ClusterProps,
  {item: nextItem}: ClusterProps,
) => {
  if (isCluster(prevItem.properties) && isCluster(nextItem.properties)) {
    return (
      prevItem.properties?.cluster_id === nextItem.properties?.cluster_id &&
      prevItem.properties?.point_count === nextItem.properties?.point_count
    )
  }

  if (!isCluster(prevItem.properties) && !isCluster(nextItem.properties)) {
    return prevItem.properties?.id === nextItem.properties?.id
  }

  return (
    prevItem.geometry.coordinates[1] === nextItem.geometry.coordinates[1] &&
    prevItem.geometry.coordinates[0] === nextItem.geometry.coordinates[0]
  )
}
