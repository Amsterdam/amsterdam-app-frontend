import {NavigationProps} from '@/app/navigation/types'
import {Tip} from '@/components/features/onboarding/types'
import {Screen} from '@/components/ui/layout/Screen'
import {useSelector} from '@/hooks/redux/useSelector'
import {Project} from '@/modules/construction-work/components/project/Project'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {selectSeenTips} from '@/store/slices/product-tour.slice'

type Props = NavigationProps<ConstructionWorkRouteName.project>

export const ProjectScreen = ({route}: Props) => {
  const hasUnseenTips = useSelector(selectSeenTips).includes(
    Tip.constructionWorkProjectFollowButton,
  )

  return (
    <Screen
      trackScroll={hasUnseenTips}
      withLeftInset={false}
      withRightInset={false}>
      <Project id={route.params.id} />
    </Screen>
  )
}
