import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {LocationsBox} from '@/modules/address/components/LocationsBox'
import {UserMenu} from '@/modules/user/components/UserMenu'

export const UserScreen = () => (
  <Screen
    hasStickyAlert
    testID="UserScreen">
    <Box>
      <Column gutter="lg">
        <LocationsBox />
        <UserMenu />
      </Column>
    </Box>
  </Screen>
)
