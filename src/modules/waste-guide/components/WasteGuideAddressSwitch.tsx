import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const WasteGuideAddressSwitch = () => (
  <AddressSwitch
    highAccuracyPurposeKey={
      HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
    }
    noAddressText="Voer een adres in om uw afvalinformatie te bekijken."
    reduxKey={ReduxKey.wasteGuide}
    testID="WasteGuideNoAddressAddressSwitch"
  />
)
