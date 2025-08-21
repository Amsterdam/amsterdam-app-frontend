import {pascalCase} from 'pascal-case'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {useFractions} from '@/modules/waste-guide/hooks/useFractions'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'

type Props = {
  wasteGuide: WasteGuideResponseFraction[]
}

export const Fractions = ({wasteGuide}: Props) => {
  const {navigate} = useNavigation()
  const fractions = useFractions(wasteGuide)

  return (
    <Column gutter="lg">
      {fractions.map(fraction => {
        const {afvalwijzerFractieCode, afvalwijzerFractieNaam} = fraction

        return (
          <NavigationButton
            Icon={
              <WasteFractionIcon
                fractionCode={afvalwijzerFractieCode}
                testID={`WasteGuide${pascalCase(afvalwijzerFractieNaam ?? '')}FractionIcon`}
              />
            }
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
