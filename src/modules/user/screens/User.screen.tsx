import {Box} from '@/components/ui/containers/Box'
import {Screen} from '@/components/ui/layout/Screen'
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
