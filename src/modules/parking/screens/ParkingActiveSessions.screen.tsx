import {Screen} from '@/components/features/screen/Screen'
import {ParkingActiveSessionsList} from '@/modules/parking/components/sessionsList/ParkingActiveSessionsList'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingActiveSessionsScreen = () => (
  <CurrentPermitProvider>
    <Screen
      scroll={false}
      testID="ParkingActiveSessionsScreen">
      <ParkingActiveSessionsList />
    </Screen>
  </CurrentPermitProvider>
)
