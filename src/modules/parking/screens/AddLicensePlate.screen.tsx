import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {AddLicensePlateForm} from '@/modules/parking/components/license-plates/AddLicensePlateForm'

export const AddLicensePlateScreen = () => (
  <Screen testID="ParkingAddLicensePlateScreen">
    <Box>
      <AddLicensePlateForm />
    </Box>
  </Screen>
)
