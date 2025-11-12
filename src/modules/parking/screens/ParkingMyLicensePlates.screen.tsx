import {Screen} from '@/components/features/screen/Screen'
import {ParkingMyLicensePlates} from '@/modules/parking/components/ParkingMyLicensePlates'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingMyLicensePlatesScreen = () => (
  <CurrentPermitProvider>
    <Screen
      hasStickyAlert
      testID="ParkingMyLicensePlatesScreen">
      <ParkingMyLicensePlates />
    </Screen>
  </CurrentPermitProvider>
)
