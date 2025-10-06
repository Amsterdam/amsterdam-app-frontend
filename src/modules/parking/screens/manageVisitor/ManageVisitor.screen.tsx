import {Screen} from '@/components/features/screen/Screen'
import {ManageVisitor} from '@/modules/parking/components/ManageVisitor'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const ParkingManageVisitorScreen = () => (
  <CurrentPermitProvider>
    <Screen
      hasStickyAlert
      testID="ParkingManageVisitorScreen">
      <ManageVisitor />
    </Screen>
  </CurrentPermitProvider>
)
