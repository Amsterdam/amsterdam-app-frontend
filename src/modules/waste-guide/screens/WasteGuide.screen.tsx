import {Screen} from '@/components/ui/layout/Screen'
import {useIsFocusedEffect} from '@/hooks/navigation/useIsFocusedEffect'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {useHasValidLocation} from '@/modules/address/hooks/useHasValidLocation'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()
  const hasValidLocation = useHasValidLocation()
  const isFocused = useIsFocusedEffect()

  if (!isFocused) {
    return null
  }

  return (
    <Screen
      bottomSheet={
        <SelectLocationTypeBottomSheet
          highAccuracyPurposeKey={
            HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
          }
        />
      }
      scroll={hasValidLocation}
      testID="WasteGuideScreen"
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <WasteGuide />
    </Screen>
  )
}
