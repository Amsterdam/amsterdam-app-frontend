import {Column} from '@/components/ui/layout'
import {Address} from '@/modules/address'
import {
  ReportWrongBuildingType,
  SelectContract,
} from '@/modules/waste-guide/components'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'

type Props = {
  address: Address
  wasteGuide: WasteGuideResponseFraction[]
}

export const WasteGuideForAmsterdam = ({address, wasteGuide}: Props) => (
  <Column>
    {!wasteGuide[0].gebruiksdoelWoonfunctie && (
      <Column gutter="md">
        <ReportWrongBuildingType />
        <SelectContract bagNummeraanduidingId={address.bagNummeraanduidingId} />
      </Column>
    )}
  </Column>
)
