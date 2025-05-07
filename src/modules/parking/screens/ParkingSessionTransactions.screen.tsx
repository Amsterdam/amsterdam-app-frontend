import {Screen} from '@/components/features/screen/Screen'
import {ParkingSessionTransactionsList} from '@/modules/parking/components/sessionsList/ParkingSessionTransactionsList'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const ParkingSessionTransactionsScreen = () => (
  <CurrentPermitProvider>
    <Screen
      scroll={false}
      testID="ParkingSessionTransactionsScreen">
      <ParkingSessionTransactionsList />
    </Screen>
  </CurrentPermitProvider>
)
