import type {ClusterItem} from '@/components/features/map/types'
import {isCluster} from '@/components/features/map/utils/isCluster'

export const checkClusterPropsHaveChanged = (
  {
    item: prevItem,
  }: {
    item: ClusterItem
  },
  {
    item: nextItem,
  }: {
    item: ClusterItem
  },
) => {
  if (isCluster(prevItem.properties) && isCluster(nextItem.properties)) {
    return (
      prevItem.properties?.cluster_id === nextItem.properties?.cluster_id &&
      prevItem.properties?.point_count === nextItem.properties?.point_count &&
      prevItem.properties?.getExpansionRegion ===
        nextItem.properties?.getExpansionRegion
    )
  }

  if (!isCluster(prevItem.properties) && !isCluster(nextItem.properties)) {
    return (
      prevItem.properties?.id === nextItem.properties?.id &&
      prevItem.properties?.onItemPress === nextItem.properties?.onItemPress
    )
  }

  return true
}
