import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {LocationsBox} from '@/modules/address/components/LocationsBox'

export const UserScreen = () => (
  <Screen
    hasStickyAlert
    testID="UserScreen">
    <Box>
      <LocationsBox />
    </Box>
  </Screen>
)
