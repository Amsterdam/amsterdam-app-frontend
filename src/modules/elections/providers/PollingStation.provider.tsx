import {ReactNode, useCallback, useMemo, useState} from 'react'
import {PollingStationContext} from '@/modules/elections/providers/PollingStation.context'
import {
  PollingStation,
  PollingStationsListBottomSheetVariant,
} from '@/modules/elections/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  children: ReactNode
}

export const PollingStationProvider = ({children}: Props) => {
  const {open} = useBottomSheet()
  const [pollingStation, setPollingStation] = useState<
    PollingStation | undefined
  >(undefined)

  const onPressListItem = useCallback(
    (p: PollingStation) => {
      setPollingStation(p)
      open(PollingStationsListBottomSheetVariant.pollingStation)
    },
    [setPollingStation, open],
  )

  const value = useMemo(
    () => ({pollingStation, setPollingStation, onPressListItem}),
    [pollingStation, onPressListItem],
  )

  return (
    <PollingStationContext.Provider value={value}>
      {children}
    </PollingStationContext.Provider>
  )
}
