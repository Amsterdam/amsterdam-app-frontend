import {ReactNode, useMemo, useState} from 'react'
import {PollingStationContext} from '@/modules/elections/providers/PollingStation.context'
import {PollingStation} from '@/modules/elections/types'

type Props = {
  children: ReactNode
}

export const PollingStationProvider = ({children}: Props) => {
  const [pollingStation, setPollingStation] = useState<
    PollingStation | undefined
  >(undefined)

  const value = useMemo(
    () => ({pollingStation, setPollingStation}),
    [pollingStation],
  )

  return (
    <PollingStationContext.Provider value={value}>
      {children}
    </PollingStationContext.Provider>
  )
}
