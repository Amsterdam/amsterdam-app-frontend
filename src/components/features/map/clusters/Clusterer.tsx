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
import type {Region} from 'react-native-maps'
import {ClusterSwitch} from '@/components/features/map/clusters/ClusterSwitch'

type ClustererProps = {
  clusterOptions?: Supercluster.Options<
    MarkerProperties | ClusterProperties,
    MarkerProperties | ClusterProperties
  >
  data: Supercluster.PointFeature<MarkerProperties | ClusterProperties>[]
  mapDimensions?: {height: number; width: number}
  region: Region
}

const DEFAULT_CLUSTER_OPTIONS: ClustererProps['clusterOptions'] = {
  radius: 40,
}

export const Clusterer = ({
  data,
  region,
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
      renderItem={(item: ClusterItem) => <ClusterSwitch item={item} />}
    />
  )
}
