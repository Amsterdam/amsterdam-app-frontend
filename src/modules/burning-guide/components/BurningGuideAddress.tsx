import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {HighAccuracyPurposeKey, type Address} from '@/modules/address/types'

type Props = {
  address?: Address
}

export const BurningGuideAddress = ({address}: Props) => (
  <Column gutter="sm">
    <ShareLocationTopTaskButton
      highAccuracyPurposeKey={
        HighAccuracyPurposeKey.PreciseLocationAddressBurningGuide
      }
      testID="WasteGuideRequestLocationButton"
    />
    {!address && (
      <Paragraph testID="BurningGuideScreenText">
        Voer een adres in om uw stookwijzer informatie te bekijken.
      </Paragraph>
    )}
  </Column>
)
