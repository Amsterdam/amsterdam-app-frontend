import {createContext} from 'react'
import {PollingStation} from '@/modules/elections/types'

export const PollingStationContext = createContext<{
  pollingStation?: PollingStation
  setPollingStation: (station: PollingStation) => void
}>({
  pollingStation: undefined,
  setPollingStation: () => null,
})
