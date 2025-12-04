import type {Address} from '@/modules/address/types'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'

type Props = {
  address?: Address
}

export const BurningGuideAddress = ({address}: Props) => (
  <Column gutter="sm">
    <ShareLocationTopTaskButton testID="WasteGuideRequestLocationButton" />
    {!address && (
      <Paragraph testID="BurningGuideScreenText">
        Voer een adres in om uw stookwijzer informatie te bekijken.
      </Paragraph>
    )}
  </Column>
)
