import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const BurningGuideAddress = () => {
  const address = useSelectedAddress()

  return (
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
}
