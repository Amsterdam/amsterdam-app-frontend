import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingCreateAccountConfirmForm} from '@/modules/boat-charging/components/BoatChargingCreateAccountConfirmForm'

export const BoatChargingCreateAccountConfirmScreen = () => (
  <Screen
    hasStickyAlert
    testID="BoatChargingCreateAccountConfirmScreen">
    <Box grow>
      <BoatChargingCreateAccountConfirmForm />
    </Box>
  </Screen>
)
