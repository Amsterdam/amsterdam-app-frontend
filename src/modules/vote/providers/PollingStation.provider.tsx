import {ReactNode, useMemo, useState} from 'react'
import {PollingStationContext} from '@/modules/vote/providers/PollingStation.context'
import {PollingStation} from '@/modules/vote/types'

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
