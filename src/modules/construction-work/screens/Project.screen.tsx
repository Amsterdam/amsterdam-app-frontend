import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/ui/layout/Screen'
import {Project} from '@/modules/construction-work/components/project/Project'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

type Props = NavigationProps<ConstructionWorkRouteName.project>

export const ProjectScreen = ({route}: Props) => (
  <Screen
    withLeftInset={false}
    withRightInset={false}>
    <Project id={route.params.id} />
  </Screen>
)
