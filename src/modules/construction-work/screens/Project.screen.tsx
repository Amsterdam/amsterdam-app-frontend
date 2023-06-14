import {RouteProp} from '@react-navigation/native'
import {Screen} from '@/components/ui/layout'
import {Project} from '@/modules/construction-work/components/project'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'

type Props = {
  route: RouteProp<
    ConstructionWorkStackParams,
    ConstructionWorkRouteName.project
  >
}

export const ProjectScreen = ({route}: Props) => (
  <Screen
    withLeftInset={false}
    withRightInset={false}>
    <Project id={route.params.id} />
  </Screen>
)
