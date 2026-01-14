import {crowdStateMap} from '@/modules/elections/constants/crowdDetails'
import {ElectionsState, type PollingStation} from '@/modules/elections/types'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

const availableStates = new Set([
  ElectionsState.calm,
  ElectionsState.medium,
  ElectionsState.busy,
])

export const getPollingStationCrowdDetails = ({
  lastUpdate: {state, time},
}: PollingStation) => {
  const available = availableStates.has(state) && time !== null
  const parsedStateNumber = available ? state : ElectionsState.unknown
  const parsedState = crowdStateMap[parsedStateNumber]

  const {label, icon, color} = parsedState

  return {label, icon, color, time: dayjsFromUnix(Number(time)), available}
}
