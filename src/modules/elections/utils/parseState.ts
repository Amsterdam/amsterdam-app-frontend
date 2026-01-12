import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {PollingStation} from '@/modules/elections/types'
import type {Theme} from '@/themes/themes'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

const stateMap = {
  1: {
    label: 'Rustig',
    icon: 'crowdCalm',
    color: 'confirm',
  },
  2: {
    label: 'Gemiddeld',
    icon: 'crowdMedium',
    color: 'alert',
  },
  3: {
    label: 'Druk',
    icon: 'crowdBusy',
    color: 'warning',
  },
  0: {
    label: 'Niet beschikbaar',
    icon: 'crowdUnknown',
    color: 'secondary',
  },
} satisfies Record<
  number,
  {color: keyof Theme['color']['text']; icon: SvgIconName; label: string}
>

export const parseState = ({lastUpdate: {state, time}}: PollingStation) => {
  const available = [1, 2, 3].includes(state) && time !== null
  const parsedStateNumber = available ? (state as 1 | 2 | 3) : 0
  const parsedState = stateMap[parsedStateNumber]

  const {label, icon, color} = parsedState

  return {label, icon, color, time: dayjsFromUnix(Number(time)), available}
}
