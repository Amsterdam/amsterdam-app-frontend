import {Box} from '@/components/ui/containers/Box'
import {AlertTopOfScreen} from '@/components/ui/feedback/AlertTopOfScreen'
import {Screen} from '@/components/ui/layout/Screen'
import {LocationsBox} from '@/modules/address/components/LocationsBox'

export const UserScreen = () => (
  <Screen
    stickyHeader={<AlertTopOfScreen />}
    testID="UserScreen">
    <Box>
      <LocationsBox />
    </Box>
  </Screen>
)
