import {useWindowDimensions} from 'react-native'
import {
  // eslint-disable-next-line no-restricted-imports
  Clusterer as RNClusterer,
  type Supercluster,
} from 'react-native-clusterer'

import type {
  ClusterItem,
  ClusterProperties,
  MarkerProperties,
} from '@/components/features/map/types'
import type {MapMarkerProps, Region} from 'react-native-maps'
import {ClusterSwitch} from '@/components/features/map/clusters/ClusterSwitch'
import {AMSTERDAM_REGION} from '@/components/features/map/constants'
import {useMap} from '@/components/features/map/hooks/useMap'

export type ClustererProps = {
  clusterOptions?: Supercluster.Options<
    MarkerProperties | ClusterProperties,
    MarkerProperties | ClusterProperties
  >
  data: Supercluster.PointFeature<MarkerProperties>[]
  mapDimensions?: {height: number; width: number}
  region?: Region
} & Omit<MapMarkerProps, 'coordinate'>

export const Clusterer = ({
  data,
  region = AMSTERDAM_REGION,
  mapDimensions,
  clusterOptions,
}: ClustererProps) => {
  const dimensions = useWindowDimensions()
  const map = useMap()

  return (
    <RNClusterer
      data={data}
      mapDimensions={mapDimensions || dimensions}
      options={clusterOptions}
      region={region}
      renderItem={(item: ClusterItem) => (
        <ClusterSwitch
          item={item}
          key={
            'cluster_id' in item.properties
              ? `cluster-${item.properties?.cluster_id}-${item.properties.point_count}`
              : `point-${item.properties?.id}`
          }
          onClusterPress={clusterRegion => map?.animateToRegion(clusterRegion)}
        />
      )}
    />
  )
}
