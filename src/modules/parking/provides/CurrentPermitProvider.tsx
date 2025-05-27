import {createContext} from 'react'
import {Screen} from '@/components/features/screen/Screen'
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
    return (
      <Screen
        bottomSheet
        testID="CurrentPermitProviderScreen">
        <PleaseWait testID="ParkingCurrentPermitProviderPleaseWait" />
      </Screen>
    )
  }

  if (!currentPermit) {
    return (
      <Screen
        bottomSheet
        testID="CurrentPermitProviderScreen">
        <SomethingWentWrong testID="ParkingCurrentPermitProviderSomethingWentWrong" />
      </Screen>
    )
  }

  return (
    <CurrentPermitContext.Provider value={currentPermit}>
      {children}
    </CurrentPermitContext.Provider>
  )
}
