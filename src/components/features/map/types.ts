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
