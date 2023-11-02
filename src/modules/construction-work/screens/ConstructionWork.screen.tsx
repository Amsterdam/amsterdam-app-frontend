import {HideFromAccessibility} from '@/components/ui/containers/HideFromAccessibility'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Screen} from '@/components/ui/layout/Screen'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ProjectsByDate} from '@/modules/construction-work/components/projects/ProjectsByDate'
import {ProjectsByDistance} from '@/modules/construction-work/components/projects/ProjectsByDistance'
import {useSelectedAddressForConstructionWork} from '@/modules/construction-work/hooks/useSelectedAddressForConstructionWork'
import {ModuleSlug} from '@/modules/slugs'

export const ConstructionWorkScreen = () => {
  const {address, isFetching: selectedAddressForConstructionWorkIsFetching} =
    useSelectedAddressForConstructionWork()

  if (selectedAddressForConstructionWorkIsFetching) {
    return <PleaseWait />
  }

  return (
    <Screen
      scroll={false}
      stickyFooter={
        <SelectLocationTypeBottomSheet
          highAccuracyPurposeKey={
            HighAccuracyPurposeKey.PreciseLocationAddressConstructionWork
          }
          slug={ModuleSlug['construction-work']}
        />
      }
      withBottomInset={false}>
      <HideFromAccessibility whileBottomSheetIsOpen>
        {address ? (
          <ProjectsByDistance address={address} />
        ) : (
          <ProjectsByDate />
        )}
      </HideFromAccessibility>
    </Screen>
  )
}
