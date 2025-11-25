import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ParkingAccountChangePinCodeForm} from '@/modules/parking/components/account/ParkingAccountChangePinCodeForm'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingAccountChangePinCodeScreen = () => (
  <CurrentPermitProvider>
    <Screen
      keyboardAware
      testID="ParkingAccountChangePinCodeScreen">
      <Box>
        <ParkingAccountChangePinCodeForm />
      </Box>
    </Screen>
  </CurrentPermitProvider>
)
