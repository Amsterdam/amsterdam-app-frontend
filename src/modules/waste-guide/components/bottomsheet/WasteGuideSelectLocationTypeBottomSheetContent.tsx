import {SelectLocationTypeBottomSheetContent} from '@/modules/address/components/location/SelectLocationTypeBottomSheetContent'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const WasteGuideSelectLocationTypeBottomSheetContent = () => (
  <SelectLocationTypeBottomSheetContent
    highAccuracyPurposeKey={
      HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
    }
  />
)
