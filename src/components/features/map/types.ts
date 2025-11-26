import type {MarkerVariant} from '@/components/features/map/marker/markers'
import type {Supercluster} from 'react-native-clusterer'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {TestProps} from '@/components/ui/types'

export enum ControlVariant {
  location = 'location',
}

export type MapControlOption = {
  accessibilityLabel: string
  iconName: SvgIconName
  key: ControlVariant
  onPress: () => void
} & TestProps

export type MarkerProperties = {
  id: string
  onItemPress?: () => void
  variant?: MarkerVariant
}

export type ClusterProperties = Supercluster.ClusterProperties &
  Supercluster.ClustererClusterProperties

export type ClusterItem = {
  geometry: {
    coordinates: number[]
  }
  properties: MarkerProperties | ClusterProperties
}
