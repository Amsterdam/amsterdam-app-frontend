import {RouteProp} from '@react-navigation/native'
import {Screen} from '@/components/ui/layout'
import {ProjectNews} from '@/modules/construction-work/components/project'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'

type ProjectNewsScreenRouteProp = RouteProp<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName.projectNews
>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => (
  <Screen withLeftInset={false} withRightInset={false}>
    <ProjectNews id={route.params.id} />
  </Screen>
)
