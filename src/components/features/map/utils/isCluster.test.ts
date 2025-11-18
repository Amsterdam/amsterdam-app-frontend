import type {
  ClusterProperties,
  MarkerProperties,
} from '@/components/features/map/types'
import type {Region} from 'react-native-maps'
import {isCluster} from '@/components/features/map/utils/isCluster'

describe('isCluster', () => {
  it('should return true when cluster_id is entry of properties', () => {
    const item: ClusterProperties = {
      cluster_id: 123,
      point_count: 2,
      point_count_abbreviated: '2',
      cluster: true,
      getExpansionRegion: () => undefined as unknown as Region,
    }

    expect(isCluster(item)).toBe(true)
  })

  it('should return false when cluster_id is not entry of properties', () => {
    const item: MarkerProperties = {
      id: '123',
    }

    expect(isCluster(item)).toBe(false)
  })
})
