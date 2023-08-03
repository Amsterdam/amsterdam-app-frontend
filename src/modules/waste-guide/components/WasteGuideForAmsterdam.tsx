import {useSelector} from 'react-redux'
import {Column} from '@/components/ui/layout/Column'
import {Address} from '@/modules/address/types'
import {ContactCollector} from '@/modules/waste-guide/components/ContactCollector'
import {Fractions} from '@/modules/waste-guide/components/Fractions'
import {ReportWrongBuildingType} from '@/modules/waste-guide/components/ReportWrongBuildingType'
import {SelectContract} from '@/modules/waste-guide/components/SelectContract'
import {selectContract} from '@/modules/waste-guide/slice'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'

type Props = {
  address: Address
  wasteGuide: WasteGuideResponseFraction[]
}

export const WasteGuideForAmsterdam = ({
  address: {bagId},
  wasteGuide,
}: Props) => {
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
      <SelectContract bagNummeraanduidingId={bagId} />
      {contract?.hasContract === false ? (
        <Fractions wasteGuide={wasteGuide} />
      ) : (
        <ContactCollector />
      )}
    </Column>
  )
}
