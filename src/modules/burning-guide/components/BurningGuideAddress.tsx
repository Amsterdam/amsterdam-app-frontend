import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {HighAccuracyPurposeKey, type Address} from '@/modules/address/types'

type Props = {
  address?: Address
}

export const BurningGuideAddress = ({address}: Props) => (
  <Column gutter="sm">
    <AddressSwitch
      highAccuracyPurposeKey={
        HighAccuracyPurposeKey.PreciseLocationAddressBurningGuide
      }
      testID="BurningGuideAddressSwitch"
    />
    {!address && (
      <Paragraph testID="BurningGuideScreenText">
        Voer een adres in om uw stookwijzer informatie te bekijken.
      </Paragraph>
    )}
  </Column>
)
