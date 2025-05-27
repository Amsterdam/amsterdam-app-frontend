import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ParkingManageVisitorChangePinCodeForm} from '@/modules/parking/components/manageVisitor/ManageVisitorChangePinCodeForm'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const ParkingManageVisitorChangePinCodeScreen = () => (
  <CurrentPermitProvider>
    <Screen testID="ParkingManageVisitorChangePinCodeScreen">
      <Box>
        <ParkingManageVisitorChangePinCodeForm />
      </Box>
    </Screen>
  </CurrentPermitProvider>
)
