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
import {AMSTERDAM_OVERVIEW} from '@/components/features/map/constants'
import {isCluster} from '@/components/features/map/utils/isCluster'

type ClustererProps = {
  clusterOptions?: Supercluster.Options<
    MarkerProperties | ClusterProperties,
    MarkerProperties | ClusterProperties
  >
  data: Supercluster.PointFeature<MarkerProperties | ClusterProperties>[]
  mapDimensions?: {height: number; width: number}
  region?: Region
} & Omit<MapMarkerProps, 'coordinate'>

const DEFAULT_CLUSTER_OPTIONS: ClustererProps['clusterOptions'] = {
  radius: 30,
}

export const Clusterer = ({
  data,
  region = AMSTERDAM_OVERVIEW,
  mapDimensions,
  clusterOptions,
}: ClustererProps) => {
  const dimensions = useWindowDimensions()

  return (
    <RNClusterer
      data={data}
      mapDimensions={mapDimensions || dimensions}
      options={clusterOptions || DEFAULT_CLUSTER_OPTIONS}
      region={region}
      renderItem={(item: ClusterItem) => (
        <ClusterSwitch
          item={item}
          key={
            isCluster(item.properties)
              ? `cluster-${item.properties?.cluster_id}`
              : `point-${item.properties?.id}`
          }
        />
      )}
    />
  )
}
