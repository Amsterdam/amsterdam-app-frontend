import {Screen} from '@/components/features/screen/Screen'
import {ParkingPlannedSessionsList} from '@/modules/parking/components/sessionsList/ParkingPlannedSessionsList'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingPlannedSessionsScreen = () => (
  <CurrentPermitProvider>
    <Screen
      scroll={false}
      testID="ParkingPlannedSessionsScreen">
      <ParkingPlannedSessionsList />
    </Screen>
  </CurrentPermitProvider>
)
