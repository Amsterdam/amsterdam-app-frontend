import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()

  return (
    <Screen
      bottomSheet={
        <BottomSheet testID="SelectLocationTypeBottomSheet">
          <SelectLocationTypeBottomSheetContent
            highAccuracyPurposeKey={
              HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
            }
          />
        </BottomSheet>
      }
      testID="WasteGuideScreen"
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <WasteGuide />
    </Screen>
  )
}
