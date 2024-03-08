import {useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Screen} from '@/components/ui/layout/Screen'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components/AuthorizedProjects'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<ConstructionWorkEditorRouteName.authorizedProjects>

export const AuthorizedProjectsScreen = ({navigation, route}: Props) => {
  const {setAlert} = useAlert()
  const deeplinkId = route.params?.id ?? undefined

  useEffect(() => {
    if (route.params?.showSuccessfullySentMessageAlert) {
      setAlert({
        content: {
          title: 'Gelukt',
          text: 'Uw bericht is geplaatst.',
        },
        testID: 'ConstructionWorkEditorSendMessageSuccessAlert',
        variant: AlertVariant.positive,
      })
      navigation.setParams({showSuccessfullySentMessageAlert: false})
    }
  }, [navigation, route.params?.showSuccessfullySentMessageAlert, setAlert])

  return (
    <Screen
      hasStickyAlert
      scroll={false}
      testID="ConstructionWorkEditorAuthorizedProjectsScreen">
      <AuthorizedProjects deeplinkId={deeplinkId} />
    </Screen>
  )
}
