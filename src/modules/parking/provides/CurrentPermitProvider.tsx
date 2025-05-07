import {createContext} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {ParkingPermit} from '@/modules/parking/types'

export const CurrentPermitContext = createContext<ParkingPermit | null>(null)

type Props = {
  children: React.ReactNode
}

export const CurrentPermitProvider = ({children}: Props) => {
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  if (isLoading) {
    return <PleaseWait testID="ParkingCurrentPermitProviderPleaseWait" />
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingCurrentPermitProviderSomethingWentWrong" />
    )
  }

  return (
    <CurrentPermitContext.Provider value={currentPermit}>
      {children}
    </CurrentPermitContext.Provider>
  )
}
