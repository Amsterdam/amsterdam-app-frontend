import {Box} from '@/components/ui/containers/Box'
import {Alert} from '@/components/ui/feedback/Alert'
import {Screen} from '@/components/ui/layout/Screen'
import {LocationBox} from '@/modules/address/components/LocationBox'

export const UserScreen = () => (
  <Screen
    stickyHeader={<Alert />}
    testID="UserScreen">
    <Box>
      <LocationBox />
    </Box>
  </Screen>
)
