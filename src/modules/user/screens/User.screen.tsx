import {Box} from '@/components/ui/containers/Box'
import {StatefulAlert} from '@/components/ui/feedback/AlertStateful'
import {Screen} from '@/components/ui/layout/Screen'
import {LocationsBox} from '@/modules/address/components/LocationsBox'

export const UserScreen = () => (
  <Screen
    stickyHeader={<StatefulAlert />}
    testID="UserScreen">
    <Box>
      <LocationsBox />
    </Box>
  </Screen>
)
