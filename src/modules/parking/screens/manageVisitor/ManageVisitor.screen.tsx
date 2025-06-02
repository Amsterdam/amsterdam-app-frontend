import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ManageVisitorCredentialsOverview} from '@/modules/parking/components/manageVisitor/ManageVisitorCredentialsOverview'
import {ManageVisitorIntro} from '@/modules/parking/components/manageVisitor/ManageVisitorIntro'
import {ManageVisitorTimeBalanceOverview} from '@/modules/parking/components/manageVisitor/ManageVisitorTimeBalanceOverview'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const ParkingManageVisitorScreen = () => (
  <CurrentPermitProvider>
    <Screen
      hasStickyAlert
      testID="ParkingManageVisitorScreen">
      <Box>
        <Column gutter="xl">
          <ManageVisitorIntro />
          <ManageVisitorTimeBalanceOverview />
          <ManageVisitorCredentialsOverview />
        </Column>
      </Box>
    </Screen>
  </CurrentPermitProvider>
)
