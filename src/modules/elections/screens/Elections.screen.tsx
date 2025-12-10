import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {PollingStationDetails} from '@/modules/elections/components/PollingStationDetails'
import {PollingStations} from '@/modules/elections/components/PollingStations'

export const ElectionsScreen = () => (
  <Screen
    bottomSheet={
      <BottomSheet
        scroll
        testID="PollingStationBottomSheet">
        <PollingStationDetails />
      </BottomSheet>
    }
    scroll={false}
    testID="ElectionsScreen">
    <PollingStations />
  </Screen>
)
