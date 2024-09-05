import {Screen} from '@/components/features/screen/Screen'
import {useIsFocusedEffect} from '@/hooks/navigation/useIsFocusedEffect'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()
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
      defaultHeader={{
        back: {},
        headerTitle: 'Afvalwijzer',
      }}
      testID="WasteGuideScreen"
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <WasteGuide />
    </Screen>
  )
}
