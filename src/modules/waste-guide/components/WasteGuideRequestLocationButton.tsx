import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const WasteGuideRequestLocationButton = () => (
  <ShareLocationTopTaskButton
    highAccuracyPurposeKey={
      HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
    }
    testID="WasteGuideRequestLocationButton"
  />
)
