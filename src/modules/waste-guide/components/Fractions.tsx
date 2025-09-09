import {skipToken} from '@reduxjs/toolkit/query'
import {pascalCase} from 'pascal-case'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {useFractions} from '@/modules/waste-guide/hooks/useFractions'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useGetWasteGuideNewQuery} from '@/modules/waste-guide/service'
import {
  FractionCode,
  WasteGuideResponseFraction,
  WasteType,
} from '@/modules/waste-guide/types'
import {capitalizeString} from '@/utils/capitalizeString'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  wasteGuide: WasteGuideResponseFraction[]
}

const getNextDate = (fractionCode: FractionCode, wasteTypes?: WasteType[]) =>
  wasteTypes?.find(type => type.code === fractionCode)?.next_date

export const Fractions = ({wasteGuide}: Props) => {
  const {navigate} = useNavigation()
  const fractions = useFractions(wasteGuide)
  const {address} = useSelectedAddress()
  const {data, isLoading} = useGetWasteGuideNewQuery(
    address ? {bagNummeraanduidingId: address.bagId} : skipToken,
  )

  if (isLoading) {
    return <PleaseWait testID="WasteGuideFractionsPleaseWait" />
  }

  return (
    <Column gutter="lg">
      {fractions.map(fraction => {
        const {afvalwijzerFractieCode, afvalwijzerFractieNaam} = fraction
        const rawDate = getNextDate(afvalwijzerFractieCode, data?.waste_types)
        const nextDate = rawDate
          ? `Ophaaldag: ${capitalizeString(dayjs(rawDate).locale('nl').format('dddd D MMMM'))}`
          : ''

        return (
          <NavigationButton
            description={nextDate}
            Icon={
              <WasteFractionIcon
                fractionCode={afvalwijzerFractieCode}
                testID={`WasteGuide${pascalCase(afvalwijzerFractieNaam ?? '')}FractionIcon`}
              />
            }
            iconSize="ml"
            inset={false}
            isDescriptionBelowIcon={false}
            key={afvalwijzerFractieCode}
            onPress={() => {
              navigate(WasteGuideRouteName.wasteGuideFraction, {fraction})
            }}
            testID={`WasteGuide${pascalCase(afvalwijzerFractieNaam ?? '')}FractionNavigationButton`}
            title={afvalwijzerFractieNaam}
          />
        )
      })}
    </Column>
  )
}
