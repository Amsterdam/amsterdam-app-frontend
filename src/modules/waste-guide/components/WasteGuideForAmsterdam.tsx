import {useSelector} from 'react-redux'
import {Column} from '@/components/ui/layout'
import {Address} from '@/modules/address'
import {
  Fractions,
  ReportWrongBuildingType,
  SelectContract,
} from '@/modules/waste-guide/components'
import {selectContract} from '@/modules/waste-guide/slice'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'

type Props = {
  address: Address
  wasteGuide: WasteGuideResponseFraction[]
}

export const WasteGuideForAmsterdam = ({address, wasteGuide}: Props) => {
  const contract = useSelector(
    selectContract(wasteGuide[0].bagNummeraanduidingId),
  )

  return (
    <Column gutter="xl">
      {!wasteGuide[0].gebruiksdoelWoonfunctie ? (
        <Column gutter="xl">
          <ReportWrongBuildingType />
          <SelectContract
            bagNummeraanduidingId={address.bagNummeraanduidingId}
          />
          {contract?.hasContract === false ? (
            <Fractions wasteGuide={wasteGuide} />
          ) : null}
        </Column>
      ) : (
        <Fractions wasteGuide={wasteGuide} />
      )}
    </Column>
  )
}
