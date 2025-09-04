import {useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {alerts} from '@/modules/construction-work-editor/alerts'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components/AuthorizedProjects'
import {LoginBoundaryScreen} from '@/modules/construction-work-editor/components/LoginBoundaryScreen'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<ConstructionWorkEditorRouteName.authorizedProjects>

export const AuthorizedProjectsScreen = ({navigation, route}: Props) => {
  const {setAlert} = useAlert()

  useEffect(() => {
    if (route.params?.showSuccessfullySentMessageAlert) {
      setAlert(alerts.postMessageSuccess)
      navigation.setParams({showSuccessfullySentMessageAlert: false})
    }
  }, [navigation, route.params?.showSuccessfullySentMessageAlert, setAlert])

  return (
    <LoginBoundaryScreen
      hasStickyAlert
      scroll={false}
      testID="ConstructionWorkEditorAuthorizedProjectsScreen">
      <AuthorizedProjects />
    </LoginBoundaryScreen>
  )
}
