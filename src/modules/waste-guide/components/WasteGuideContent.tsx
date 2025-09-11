import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ContactCollector} from '@/modules/waste-guide/components/ContactCollector'
import {Fractions} from '@/modules/waste-guide/components/Fractions'
import {ReportWrongBuildingType} from '@/modules/waste-guide/components/ReportWrongBuildingType'
import {SelectContract} from '@/modules/waste-guide/components/SelectContract'
import {selectContract} from '@/modules/waste-guide/slice'
import {WasteGuideResponse} from '@/modules/waste-guide/types'
import {getFractionsForCollectionByAppointment} from '@/modules/waste-guide/utils/getFractionsForCollectionByAppointment'
import {updateFractionLabels} from '@/modules/waste-guide/utils/updateFractionLabels'

type Props = {
  bagId: string
  wasteGuide: WasteGuideResponse
}

export const WasteGuideContent = ({bagId, wasteGuide}: Props) => {
  const {address} = useSelectedAddress()
  const contract = useSelector(selectContract(bagId))
  const fractions = wasteGuide.is_collection_by_appointment
    ? getFractionsForCollectionByAppointment(wasteGuide.waste_types)
    : updateFractionLabels(wasteGuide.waste_types)

  if (wasteGuide.is_residential) {
    return <Fractions fractions={fractions} />
  }

  if (!address) {
    return (
      <SomethingWentWrong testID="WasteGuideWasteGuideForAmsterdamSomethingWentWrong" />
    )
  }

  return (
    <Column gutter="xl">
      <ReportWrongBuildingType testID="WasteGuideReportWrongBuildingType" />
      <SelectContract bagNummeraanduidingId={address.bagId} />
      {contract?.hasContract === false ? (
        <Fractions fractions={fractions} />
      ) : (
        <ContactCollector />
      )}
    </Column>
  )
}
