import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useNavigateToHomeIfModuleInactive} from '@/hooks/useNavigateToHomeIfModuleInactive'
import {ProjectNews} from '@/modules/construction-work/components/project/ProjectNews'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<ConstructionWorkRouteName.projectNews>

export const ProjectNewsScreen = ({route}: Props) => {
  const {
    params: {id, projectId},
  } = route
  const isLoading = useNavigateToHomeIfModuleInactive(
    ModuleSlug['construction-work'],
  )

  if (isLoading) {
    return <PleaseWait testID="ConstructionWorkProjectNewsScreenPleaseWait" />
  }

  return (
    <Screen
      testID="ConstructionWorkProjectNewsScreen"
      withLeftInset={false}
      withRightInset={false}>
      <ProjectNews
        id={id}
        projectId={projectId}
      />
    </Screen>
  )
}
