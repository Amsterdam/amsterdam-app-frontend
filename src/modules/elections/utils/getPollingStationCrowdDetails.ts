import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {Theme} from '@/themes/themes'
import {ElectionsState, type PollingStation} from '@/modules/elections/types'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

const availableStates = new Set([
  ElectionsState.calm,
  ElectionsState.medium,
  ElectionsState.busy,
])

const stateMap: Record<
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
    label: 'Niet beschikbaar',
    icon: 'crowdUnknown',
    color: 'secondary',
  },
}

export const getPollingStationCrowdDetails = ({
  lastUpdate: {state, time},
}: PollingStation) => {
  const available = availableStates.has(state) && time !== null
  const parsedStateNumber = available ? state : ElectionsState.unknown
  const parsedState = stateMap[parsedStateNumber]

  const {label, icon, color} = parsedState

  return {label, icon, color, time: dayjsFromUnix(Number(time)), available}
}
