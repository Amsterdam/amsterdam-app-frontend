import {createContext} from 'react'
import {navigationRef} from '@/app/navigation/navigationRef'
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
  const {currentPermit, isLoading, refetch} = useGetCurrentParkingPermit()
  const {headerShown = true} = (navigationRef.current?.getCurrentOptions() ??
    {}) as {headerShown?: boolean}

  if (isLoading) {
    return (
      <Screen
        bottomSheet={!headerShown}
        testID="ParkingCurrentPermitProviderScreen">
        <PleaseWait testID="ParkingCurrentPermitProviderPleaseWait" />
      </Screen>
    )
  }

  if (!currentPermit) {
    return (
      <Screen
        bottomSheet={!headerShown}
        testID="ParkingCurrentPermitProviderScreen">
        <SomethingWentWrong
          retryFn={refetch}
          testID="ParkingCurrentPermitProviderSomethingWentWrong"
        />
      </Screen>
    )
  }

  return (
    <CurrentPermitContext.Provider value={currentPermit}>
      {children}
    </CurrentPermitContext.Provider>
  )
}
