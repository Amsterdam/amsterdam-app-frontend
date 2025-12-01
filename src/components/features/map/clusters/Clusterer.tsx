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
import {ClusterMarker} from '@/components/features/map/clusters/ClusterMarker'
import {AMSTERDAM_REGION} from '@/components/features/map/constants'
import {Marker} from '@/components/features/map/marker/Marker'

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

  return (
    <RNClusterer
      data={data}
      mapDimensions={mapDimensions || dimensions}
      options={clusterOptions}
      region={region}
      renderItem={(item: ClusterItem) => {
        const id =
          'cluster_id' in item.properties
            ? `cluster-${item.properties?.cluster_id}-${item.properties.point_count}`
            : `point-${item.properties?.id}`

        const onPress =
          'cluster_id' in item.properties
            ? undefined
            : item.properties.onItemPress

        return (
          <Marker
            coordinate={{
              latitude: item.geometry.coordinates[1],
              longitude: item.geometry.coordinates[0],
            }}
            id={id}
            key={id}
            onPress={onPress}
            onSelect={onPress}
            tracksViewChanges={false}
            variant={
              'cluster_id' in item.properties
                ? undefined
                : item.properties.variant
            }>
            {'cluster_id' in item.properties && (
              <ClusterMarker count={item.properties.point_count} />
            )}
          </Marker>
        )
      }}
    />
  )
}
