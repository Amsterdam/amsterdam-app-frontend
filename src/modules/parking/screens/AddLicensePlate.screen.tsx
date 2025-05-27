import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {AddLicensePlateForm} from '@/modules/parking/components/license-plates/AddLicensePlateForm'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const AddLicensePlateScreen = () => (
  <CurrentPermitProvider>
    <Screen testID="ParkingAddLicensePlateScreen">
      <Box>
        <AddLicensePlateForm />
      </Box>
    </Screen>
  </CurrentPermitProvider>
)
