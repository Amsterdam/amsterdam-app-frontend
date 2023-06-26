import {useSelector} from 'react-redux'
import {Column} from '@/components/ui/layout'
import {Address} from '@/modules/address/types'
import {
  ContactCollector,
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

  if (wasteGuide[0].gebruiksdoelWoonfunctie) {
    return (
      <Column gutter="xl">
        <Fractions wasteGuide={wasteGuide} />
      </Column>
    )
  }

  return (
    <Column gutter="xl">
      <ReportWrongBuildingType />
      <SelectContract bagNummeraanduidingId={address.bagId} />
      {contract?.hasContract === false ? (
        <Fractions wasteGuide={wasteGuide} />
      ) : (
        <ContactCollector />
      )}
    </Column>
  )
}
