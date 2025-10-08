import {Screen} from '@/components/features/screen/Screen'
import {ParkingSessionHistory} from '@/modules/parking/components/sessionsList/ParkingSessionHistory'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const ParkingSessionHistoryScreen = () => (
  <CurrentPermitProvider>
    <Screen
      scroll={false}
      testID="ParkingSessionHistoryScreen">
      <ParkingSessionHistory />
    </Screen>
  </CurrentPermitProvider>
)
