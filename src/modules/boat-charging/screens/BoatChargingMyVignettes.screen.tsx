import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {BoatChargingMyVignettes} from '@/modules/boat-charging/components/vignettes/BoatChargingMyVignettes'

export const BoatChargingMyVignettesScreen = () => (
  <Screen
    scroll={false}
    testID="BoatChargingMyVignettesScreen">
    <Box grow>
      <BoatChargingMyVignettes />
    </Box>
  </Screen>
)
