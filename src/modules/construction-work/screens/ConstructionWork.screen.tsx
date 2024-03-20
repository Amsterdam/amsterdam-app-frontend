import {Screen} from '@/components/ui/layout/Screen'
import {useIsFocusedEffect} from '@/hooks/navigation/useIsFocusedEffect'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {Projects} from '@/modules/construction-work/components/projects/Projects'

export const ConstructionWorkScreen = () => {
  const isFocused = useIsFocusedEffect()

  return isFocused ? (
    <Screen
      bottomSheet={
        <SelectLocationTypeBottomSheet
          highAccuracyPurposeKey={
            HighAccuracyPurposeKey.PreciseLocationAddressConstructionWork
          }
        />
      }
      scroll={false}
      testID="ConstructionWorkScreen"
      withBottomInset={false}
      withLeftInset={false}
      withRightInset={false}>
      <Projects
        HeaderButton={<ShareLocationTopTaskButton testID="ConstructionWork" />}
      />
    </Screen>
  ) : null
}
