import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {LocationsBox} from '@/modules/address/components/LocationsBox'

export const AddressScreen = () => (
  <Screen
    hasStickyAlert
    testID="AddressScreen">
    <Box>
      <LocationsBox />
    </Box>
  </Screen>
)
