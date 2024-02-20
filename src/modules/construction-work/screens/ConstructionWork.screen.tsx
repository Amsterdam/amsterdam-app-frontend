import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Screen} from '@/components/ui/layout/Screen'
import {useIsFocusedEffect} from '@/hooks/navigation/useIsFocusedEffect'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ProjectsByDate} from '@/modules/construction-work/components/projects/ProjectsByDate'
import {ProjectsByDistance} from '@/modules/construction-work/components/projects/ProjectsByDistance'
import {useSelectedAddressForConstructionWork} from '@/modules/construction-work/hooks/useSelectedAddressForConstructionWork'
import {ModuleSlug} from '@/modules/slugs'

export const ConstructionWorkScreen = () => {
  const {address, isFetching: selectedAddressForConstructionWorkIsFetching} =
    useSelectedAddressForConstructionWork()
  const isFocused = useIsFocusedEffect()

  if (selectedAddressForConstructionWorkIsFetching) {
    return <PleaseWait testID="ConstructionWorkLoadingSpinner" />
  }

  return isFocused ? (
    <Screen
      bottomSheet={
        <SelectLocationTypeBottomSheet
          highAccuracyPurposeKey={
            HighAccuracyPurposeKey.PreciseLocationAddressConstructionWork
          }
          slug={ModuleSlug['construction-work']}
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
