import {Screen} from '@/components/ui/layout/Screen'
import {useIsFocusedEffect} from '@/hooks/navigation/useIsFocusedEffect'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ProjectsByDate} from '@/modules/construction-work/components/projects/ProjectsByDate'
import {ProjectsByDistance} from '@/modules/construction-work/components/projects/ProjectsByDistance'

export const ConstructionWorkScreen = () => {
  const {address} = useSelectedAddress()
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
      {address ? <ProjectsByDistance address={address} /> : <ProjectsByDate />}
    </Screen>
  ) : null
}
