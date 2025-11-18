import type {
  MarkerProperties,
  ClusterProperties,
} from '@/components/features/map/types'

export const isCluster = (
  properties: MarkerProperties | ClusterProperties,
): properties is ClusterProperties => 'cluster_id' in properties
