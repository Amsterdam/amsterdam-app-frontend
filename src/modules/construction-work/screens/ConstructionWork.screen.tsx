import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {Projects} from '@/modules/construction-work/components/projects/Projects'

export const ConstructionWorkScreen = () => (
  <Screen
    bottomSheet={
      <BottomSheet testID="SelectLocationTypeBottomSheet">
        <SelectLocationTypeBottomSheetContent
          highAccuracyPurposeKey={
            HighAccuracyPurposeKey.PreciseLocationAddressConstructionWork
          }
        />
      </BottomSheet>
    }
    scroll={false}
    testID="ConstructionWorkScreen"
    withBottomInset={false}
    withLeftInset={false}
    withRightInset={false}>
    <Projects />
  </Screen>
)
