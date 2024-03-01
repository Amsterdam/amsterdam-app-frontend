import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ContactCollector} from '@/modules/waste-guide/components/ContactCollector'
import {Fractions} from '@/modules/waste-guide/components/Fractions'
import {ReportWrongBuildingType} from '@/modules/waste-guide/components/ReportWrongBuildingType'
import {SelectContract} from '@/modules/waste-guide/components/SelectContract'
import {selectContract} from '@/modules/waste-guide/slice'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'

type Props = {
  wasteGuide: WasteGuideResponseFraction[]
}

export const WasteGuideForAmsterdam = ({wasteGuide}: Props) => {
  const {address} = useSelectedAddress()
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

  if (!address) {
    return <SomethingWentWrong />
  }

  return (
    <Column gutter="xl">
      <ReportWrongBuildingType testID="WasteGuideReportWrongBuildingType" />
      <SelectContract bagNummeraanduidingId={address.bagId} />
      {contract?.hasContract === false ? (
        <Fractions wasteGuide={wasteGuide} />
      ) : (
        <ContactCollector />
      )}
    </Column>
  )
}
