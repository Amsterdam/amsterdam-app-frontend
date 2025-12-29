import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'

export const WasteGuideAddressSwitch = () => (
  <AddressSwitch
    highAccuracyPurposeKey={
      HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
    }
    moduleSlug={ModuleSlug['waste-guide']}
    noAddressText="Voer een adres in om uw afvalinformatie te bekijken."
    testID="WasteGuideNoAddressAddressSwitch"
  />
)
