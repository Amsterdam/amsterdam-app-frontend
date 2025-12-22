import {Column} from '@/components/ui/layout/Column'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const BurningGuideAddress = () => (
  <Column gutter="sm">
    <AddressSwitch
      highAccuracyPurposeKey={
        HighAccuracyPurposeKey.PreciseLocationAddressBurningGuide
      }
      noAddressText="Voer een adres in om uw stookwijzer informatie te bekijken."
      testID="BurningGuideAddressSwitch"
    />
  </Column>
)
