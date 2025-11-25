import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingAccountCredentials} from '@/modules/parking/components/account/ParkingAccountCredentials'
import {ParkingAccountDetails} from '@/modules/parking/components/account/ParkingAccountDetails'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingAccountDetailsScreen = () => (
  <CurrentPermitProvider>
    <Screen
      hasStickyAlert
      testID="ParkingAccountDetailsScreen">
      <Box>
        <Column gutter="xl">
          <ParkingAccountDetails />
          <ParkingAccountCredentials />
        </Column>
      </Box>
    </Screen>
  </CurrentPermitProvider>
)
