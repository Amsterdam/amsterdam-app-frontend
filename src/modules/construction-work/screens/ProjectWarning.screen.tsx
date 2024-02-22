import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/ui/layout/Screen'
import {ProjectWarning} from '@/modules/construction-work/components/project/ProjectWarning'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

type Props = NavigationProps<ConstructionWorkRouteName.projectWarning>

export const ProjectWarningScreen = ({route}: Props) => {
  const {
    params: {id, projectId},
  } = route

  return (
    <Screen
      testID="ConstructionWorkProjectWarningScreen"
      withLeftInset={false}
      withRightInset={false}>
      <ProjectWarning
        id={id}
        projectId={projectId}
      />
    </Screen>
  )
}
