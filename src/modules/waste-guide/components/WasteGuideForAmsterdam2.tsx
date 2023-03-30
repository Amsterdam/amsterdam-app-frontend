import {Column} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {Address} from '@/modules/address'
import {SelectContract} from '@/modules/waste-guide/components'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'

type Props = {
  address: Address
  wasteGuide: WasteGuideResponseFraction[]
}

export const WasteGuideForAmsterdam2 = ({address, wasteGuide}: Props) => (
  <Column>
    <Title text="WasteGuideForAmsterdam 2" />
    {!!wasteGuide[0].gebruiksdoelWoonfunctie && (
      <SelectContract bagNummeraanduidingId={address.bagNummeraanduidingId} />
    )}
  </Column>
)
