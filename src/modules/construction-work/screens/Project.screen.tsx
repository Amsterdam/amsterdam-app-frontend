import {NavigationProps} from '@/app/navigation/types'
import {Tip} from '@/components/features/product-tour/types'
import {Screen} from '@/components/features/screen/Screen'
import {Project} from '@/modules/construction-work/components/project/Project'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

type Props = NavigationProps<ConstructionWorkRouteName.project>

export const ProjectScreen = ({route}: Props) => (
  <Screen
    testID="ConstructionWorkProjectScreen"
    trackScroll={[Tip.constructionWorkProjectFollowButton]}
    withLeftInset={false}
    withRightInset={false}>
    <Project id={route.params.id} />
  </Screen>
)
