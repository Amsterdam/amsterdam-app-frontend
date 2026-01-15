import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {Theme} from '@/themes/themes'
import {ElectionsState} from '@/modules/elections/types'

export const crowdStateMap: Record<
  ElectionsState,
  {color: keyof Theme['color']['text']; icon: SvgIconName; label: string}
> = {
  [ElectionsState.calm]: {
    label: 'Rustig',
    icon: 'crowdCalm',
    color: 'confirm',
  },
  [ElectionsState.medium]: {
    label: 'Gemiddeld',
    icon: 'crowdMedium',
    color: 'alert',
  },
  [ElectionsState.busy]: {
    label: 'Druk',
    icon: 'crowdBusy',
    color: 'warning',
  },
  [ElectionsState.unknown]: {
    label: 'Onbekend',
    icon: 'crowdUnknown',
    color: 'secondary',
  },
}
