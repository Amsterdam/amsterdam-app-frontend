import {createContext} from 'react'
import {PollingStation} from '@/modules/elections/types'

export const PollingStationContext = createContext<{
  onPressListItem: (station: PollingStation) => void
  pollingStation?: PollingStation
  setPollingStation: (station?: PollingStation) => void
}>({
  onPressListItem: () => null,
  pollingStation: undefined,
  setPollingStation: () => null,
})
