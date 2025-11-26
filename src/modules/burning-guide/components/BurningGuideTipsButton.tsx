import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'

export const BurningGuideTipsButton = () => {
  const {navigate} = useNavigation()

  return (
    <TopTaskButton
      iconName="lightBulb"
      iconRightName="chevron-right"
      iconRightSize="ml"
      onPress={() => navigate(BurningGuideRouteName.burningGuideTips)}
      testID="BurningGuideTipsButton"
      text="Wilt u toch stoken? Doe het dan zo schoon mogelijk. "
      title="Houtstook tips"
    />
  )
}
