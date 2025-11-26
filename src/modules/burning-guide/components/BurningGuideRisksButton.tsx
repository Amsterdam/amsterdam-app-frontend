import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'

export const BurningGuideRisksButton = () => {
  const {navigate} = useNavigation()

  return (
    <TopTaskButton
      iconName="medicalKit"
      iconRightName="chevron-right"
      iconRightSize="ml"
      onPress={() => navigate(BurningGuideRouteName.burningGuideRisks)}
      testID="BurningGuideRisksButton"
      text="Lees wat houtrook doet met u en uw buren."
      title="Houtrook is ongezond"
    />
  )
}
