import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ManageVisitorCredentialsOverview} from '@/modules/parking/components/manageVisitor/ManageVisitorCredentialsOverview'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const ParkingManageVisitorIncreaseTimeBalanceScreen = () => (
  <CurrentPermitProvider>
    <Screen testID="ParkingManageVisitorIncreaseTimeBalanceScreen">
      <Box>
        <Column gutter="xl">
          <ManageVisitorCredentialsOverview />
        </Column>
      </Box>
    </Screen>
  </CurrentPermitProvider>
)
