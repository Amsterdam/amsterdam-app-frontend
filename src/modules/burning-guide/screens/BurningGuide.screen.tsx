import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {BurningGuide} from '@/modules/burning-guide/components/BurningGuide'
import {BurningGuideAddress} from '@/modules/burning-guide/components/BurningGuideAddress'
import {BurningGuideInfoButtons} from '@/modules/burning-guide/components/BurningGuideInfoButtons'

export const BurningGuideScreen = () => {
  const {address} = useSelectedAddress()

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
      testID="BurningGuideScreen">
      <Column
        grow={1}
        gutter="lg">
        <Box>
          <Column gutter="xl">
            <BurningGuideAddress address={address} />
            {!!address && <BurningGuide zipCode={address.postcode} />}
          </Column>
        </Box>
      </Column>
      <BurningGuideInfoButtons />
    </Screen>
  )
}
