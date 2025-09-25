import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ContactCollector} from '@/modules/waste-guide/components/ContactCollector'
import {Fractions} from '@/modules/waste-guide/components/Fractions'
import {NavigationButtonToWasteCalendar} from '@/modules/waste-guide/components/NavigationButtonToWasteCalendar'
import {ReportWrongBuildingType} from '@/modules/waste-guide/components/ReportWrongBuildingType'
import {SelectContract} from '@/modules/waste-guide/components/SelectContract'
import {selectContract} from '@/modules/waste-guide/slice'
import {WasteGuideResponse} from '@/modules/waste-guide/types'
import {getFractionsForCollectionByAppointment} from '@/modules/waste-guide/utils/getFractionsForCollectionByAppointment'

type Props = {
  bagId: string
  wasteGuide: WasteGuideResponse
}

export const WasteGuideContent = ({bagId, wasteGuide}: Props) => {
  const {address} = useSelectedAddress()
  const contract = useSelector(selectContract(bagId))
  const fractions = wasteGuide.is_collection_by_appointment
    ? getFractionsForCollectionByAppointment(wasteGuide.waste_types)
    : wasteGuide.waste_types

  if (wasteGuide.is_residential) {
    return (
      <WasteGuideCollectionInformation
        fractions={fractions}
        isCollectionByAppointment={wasteGuide.is_collection_by_appointment}
      />
    )
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
        <WasteGuideCollectionInformation
          fractions={fractions}
          isCollectionByAppointment={wasteGuide.is_collection_by_appointment}
        />
      ) : (
        <ContactCollector />
      )}
    </Column>
  )
}

type WasteGuideCollectionInformationProps = {
  fractions: WasteGuideResponse['waste_types']
  isCollectionByAppointment: boolean
}

const WasteGuideCollectionInformation = ({
  fractions,
  isCollectionByAppointment,
}: WasteGuideCollectionInformationProps) => (
  <Column gutter="lg">
    <Column gutter="sm">
      <Title
        testID="WasteGuideTitle"
        text="Afvalinformatie"
      />
      {!isCollectionByAppointment && <NavigationButtonToWasteCalendar />}
    </Column>
    <Fractions
      fractions={fractions}
      isCollectionByAppointment={isCollectionByAppointment}
    />
  </Column>
)
