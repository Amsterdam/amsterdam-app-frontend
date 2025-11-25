import {Screen} from '@/components/features/screen/Screen'
import {ParkingMoneyTransactionsList} from '@/modules/parking/components/moneyTransactionsList/ParkingMoneyTransactionsList'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingMoneyTransactionsScreen = () => (
  <CurrentPermitProvider>
    <Screen
      scroll={false}
      testID="ParkingMoneyTransactionsScreen">
      <ParkingMoneyTransactionsList />
    </Screen>
  </CurrentPermitProvider>
)
