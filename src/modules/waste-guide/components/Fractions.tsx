import {pascalCase} from 'pascal-case'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {WasteType} from '@/modules/waste-guide/types'
import {getNextCollectionDate} from '@/modules/waste-guide/utils/getNextCollectionDate'

type Props = {
  fractions: WasteType[]
  isCollectionByAppointment: boolean
}

export const Fractions = ({fractions, isCollectionByAppointment}: Props) => {
  const {navigate} = useNavigation()

  return (
    <Column gutter="lg">
      {fractions.map(fraction => {
        const {code, label} = fraction
        const nextCollectionDate = getNextCollectionDate(fraction)

        return (
          <NavigationButton
            description={
              !isCollectionByAppointment && nextCollectionDate
                ? `Ophaaldag: ${nextCollectionDate}`
                : ''
            }
            Icon={<WasteFractionIcon fractionCode={code} />}
            iconSize="ml"
            inset={false}
            isDescriptionBelowIcon={false}
            key={code}
            onPress={() => {
              navigate(WasteGuideRouteName.wasteGuideFraction, {fraction})
            }}
            testID={`WasteGuide${pascalCase(label ?? '')}FractionNavigationButton`}
            title={label}
          />
        )
      })}
    </Column>
  )
}
