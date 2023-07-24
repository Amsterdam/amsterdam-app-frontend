import {Box} from '@/components/ui/containers/Box'
import {Alert} from '@/components/ui/feedback/Alert'
import {Screen} from '@/components/ui/layout/Screen'
import {LocationsBox} from '@/modules/address/components/LocationsBox'

export const UserScreen = () => (
  <Screen
    stickyHeader={<Alert />}
    testID="UserScreen">
    <Box>
      <LocationsBox />
    </Box>
  </Screen>
)
