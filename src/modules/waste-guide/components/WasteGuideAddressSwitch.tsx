import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const WasteGuideAddressSwitch = () => (
  <AddressSwitch
    highAccuracyPurposeKey={
      HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
    }
    noAddressText="Voer een adres in om uw afvalinformatie te bekijken."
    testID="WasteGuideNoAddressAddressSwitch"
  />
)
