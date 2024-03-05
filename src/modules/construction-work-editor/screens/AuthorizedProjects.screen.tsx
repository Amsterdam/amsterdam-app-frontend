import {useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {AlertVariant} from '@/components/ui/feedback/Alert.types'
import {AlertTopOfScreen} from '@/components/ui/feedback/AlertTopOfScreen'
import {Screen} from '@/components/ui/layout/Screen'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components/AuthorizedProjects'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {setAlert} from '@/store/slices/alert'

type Props = NavigationProps<ConstructionWorkEditorRouteName.authorizedProjects>

export const AuthorizedProjectsScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()
  const deeplinkId = route.params?.id ?? undefined

  useEffect(() => {
    if (route.params?.showSuccessfullySentMessageAlert) {
      dispatch(
        setAlert({
          content: {
            title: 'Gelukt',
            text: 'Uw bericht is geplaatst.',
          },
          testID: 'ConstructionWorkEditorSendMessageSuccessAlert',
          variant: AlertVariant.positive,
        }),
      )
      navigation.setParams({showSuccessfullySentMessageAlert: false})
    }
  }, [dispatch, navigation, route.params?.showSuccessfullySentMessageAlert])

  return (
    <Screen
      scroll={false}
      stickyHeader={<AlertTopOfScreen />}
      testID="ConstructionWorkEditorAuthorizedProjectsScreen">
      <AuthorizedProjects deeplinkId={deeplinkId} />
    </Screen>
  )
}
