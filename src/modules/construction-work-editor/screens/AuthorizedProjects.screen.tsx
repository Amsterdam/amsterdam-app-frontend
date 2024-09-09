import {useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useNavigateToHomeIfModuleInactive} from '@/hooks/useNavigateToHomeIfModuleInactive'
import {alerts} from '@/modules/construction-work-editor/alerts'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components/AuthorizedProjects'
import {LoginBoundaryScreen} from '@/modules/construction-work-editor/components/LoginBoundaryScreen'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {ModuleSlug} from '@/modules/slugs'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<ConstructionWorkEditorRouteName.authorizedProjects>

export const AuthorizedProjectsScreen = ({navigation, route}: Props) => {
  const {setAlert} = useAlert()
  const isLoading = useNavigateToHomeIfModuleInactive(
    ModuleSlug['construction-work-editor'],
  )

  useEffect(() => {
    if (route.params?.showSuccessfullySentMessageAlert) {
      setAlert(alerts.postMessageSuccess)
      navigation.setParams({showSuccessfullySentMessageAlert: false})
    }
  }, [navigation, route.params?.showSuccessfullySentMessageAlert, setAlert])

  if (isLoading) {
    return (
      <PleaseWait testID="ConstructionWorkEditorAuthorizedProjectsScreenPleaseWait" />
    )
  }

  return (
    <LoginBoundaryScreen
      hasStickyAlert
      scroll={false}
      testID="ConstructionWorkEditorAuthorizedProjectsScreen">
      <AuthorizedProjects />
    </LoginBoundaryScreen>
  )
}
