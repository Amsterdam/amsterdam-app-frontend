import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useNavigateToHomeIfModuleInactive} from '@/hooks/useNavigateToHomeIfModuleInactive'
import {ProjectWarning} from '@/modules/construction-work/components/project/ProjectWarning'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<ConstructionWorkRouteName.projectWarning>

export const ProjectWarningScreen = ({route}: Props) => {
  const {
    params: {id, projectId},
  } = route
  const isLoading = useNavigateToHomeIfModuleInactive(
    ModuleSlug['construction-work'],
  )

  if (isLoading) {
    return (
      <PleaseWait testID="ConstructionWorkProjectWarningScreenPleaseWait" />
    )
  }

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
