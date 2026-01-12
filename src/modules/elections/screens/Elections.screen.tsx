import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {PollingStations} from '@/modules/elections/components/PollingStations'
import {bottomsheetVariants} from '@/modules/elections/components/bottomsheet/bottomsheetVariants'

export const ElectionsScreen = () => (
  <Screen
    bottomSheet={
      <BottomSheet
        scroll
        testID="PollingStationBottomSheet"
        variants={bottomsheetVariants}
      />
    }
    scroll={false}
    testID="ElectionsScreen"
    withBottomInset={false}>
    <PollingStations />
  </Screen>
)
