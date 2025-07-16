import {Screen} from '@/components/features/screen/Screen'
import {ParkingSessionDetailsPermitZones} from '@/modules/parking/components/session/details/ParkingSessionDetailsPermitZones'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const ParkingPermitZonesScreen = () => (
  <Screen
    scroll={false}
    testID="WasteGuideContainerMapScreen">
    <CurrentPermitProvider>
      <ParkingSessionDetailsPermitZones />
    </CurrentPermitProvider>
  </Screen>
)
