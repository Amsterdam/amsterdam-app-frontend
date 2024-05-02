import {useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components/AuthorizedProjects'
import {LoginBoundaryScreen} from '@/modules/construction-work-editor/components/LoginBoundaryScreen'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<ConstructionWorkEditorRouteName.authorizedProjects>

export const AuthorizedProjectsScreen = ({navigation, route}: Props) => {
  const {setAlert} = useAlert()

  useEffect(() => {
    if (route.params?.showSuccessfullySentMessageAlert) {
      setAlert({
        title: 'Gelukt',
        text: 'Uw bericht is geplaatst.',
        testID: 'ConstructionWorkEditorSendMessageSuccessAlert',
        variant: AlertVariant.positive,
      })
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
