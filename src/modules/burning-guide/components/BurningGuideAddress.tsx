import {Column} from '@/components/ui/layout/Column'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'

export const BurningGuideAddress = () => (
  <Column gutter="sm">
    <AddressSwitch
      highAccuracyPurposeKey={
        HighAccuracyPurposeKey.PreciseLocationAddressBurningGuide
      }
      moduleSlug={ModuleSlug['burning-guide']}
      noAddressText="Voer een adres in om uw stookwijzer informatie te bekijken."
      testID="BurningGuideAddressSwitch"
    />
  </Column>
)
